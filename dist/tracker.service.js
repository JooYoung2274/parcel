"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const url_1 = require("url");
const tracker_constants_1 = require("./tracker.constants");
const tracker_options_service_1 = require("./tracker-options.service");
let TrackerService = class TrackerService {
    constructor(options) {
        this.options = options;
        this.trackerOptionsService = new tracker_options_service_1.TrackerOptionsService();
        this.trackerOptionsService.optionSetting().then((options) => {
            this.option1 = options.option1;
            this.option2 = options.option2;
        });
        this.axiosSetting(this.options.rateLimit);
    }
    async axiosSetting(MAX_RETRY_COUNT) {
        this.axios = axios_1.default.create();
        this.axios.interceptors.response.use(undefined, async (error) => {
            const config = error.config;
            config.retryCount = config.retryCount ?? 0;
            const shouldRetry = config.retryCount < MAX_RETRY_COUNT;
            if (shouldRetry) {
                const { option1, option2 } = await this.trackerOptionsService.optionSetting();
                this.option1 = option1;
                this.option2 = option2;
                const queryString = await this.getParams();
                config.url = `${tracker_constants_1.PARCEL_URL.DETAIL}?${queryString}`;
                config.headers = {
                    cookie: this.option1,
                };
                config.retryCount += 1;
                return this.axios.request(config);
            }
            return Promise.reject(error);
        });
    }
    async getParams() {
        const queryString = new url_1.URLSearchParams({ paramInvcNo: this.waybillNumber, _csrf: this.option2 }).toString();
        return queryString;
    }
    async parcelTracker(waybillNumber) {
        this.waybillNumber = waybillNumber;
        if (!(this.waybillNumber.length === 12 || this.waybillNumber.length === 10)) {
            throw new common_1.BadRequestException(`${this.waybillNumber} ::: waybillNumber is invalid (length == 10 | 12)`);
        }
        const queryString = await this.getParams();
        const res = await this.axios.request({
            url: `${tracker_constants_1.PARCEL_URL.DETAIL}?${queryString}`,
            method: 'POST',
            headers: {
                cookie: this.option1,
            },
        });
        if (!res?.data?.parcelResultMap?.resultList.length) {
            throw new common_1.BadRequestException(`${this.waybillNumber} ::: waybillNumber not found`);
        }
        return res.data;
    }
    async parcelListTracker(waybillNumberList) {
        let result = [];
        let invalidWaybillNumber = [];
        for (let i = 0; i < waybillNumberList.length; i++) {
            this.waybillNumber = waybillNumberList[i];
            if (!(this.waybillNumber.length === 12 || this.waybillNumber.length === 10)) {
                invalidWaybillNumber.push({
                    waybillNumber: this.waybillNumber,
                    message: 'waybillNumber is invalid (length == 10 | 12)',
                });
                continue;
            }
            const queryString = await this.getParams();
            const res = await this.axios.request({
                url: `${tracker_constants_1.PARCEL_URL.DETAIL}?${queryString}`,
                method: 'POST',
                headers: {
                    cookie: this.option1,
                },
            });
            if (!res?.data?.parcelResultMap?.resultList.length) {
                invalidWaybillNumber.push({
                    waybillNumber: this.waybillNumber,
                    message: 'waybillNumber not found',
                });
                continue;
            }
            result.push(res.data);
        }
        return { result, invalidWaybillNumber };
    }
};
TrackerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], TrackerService);
exports.TrackerService = TrackerService;
//# sourceMappingURL=tracker.service.js.map