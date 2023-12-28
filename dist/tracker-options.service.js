"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerOptionsService = void 0;
const tough_cookie_1 = require("tough-cookie");
const cheerio = require("cheerio");
const tracker_constants_1 = require("./tracker.constants");
const common_1 = require("@nestjs/common");
let TrackerOptionsService = class TrackerOptionsService {
    async mainPageFetch() {
        return await fetch(tracker_constants_1.PARCEL_URL.MAIN);
    }
    async getOption1(response) {
        const option1 = response.headers
            .get('set-cookie')
            ?.split(',')
            .map((cookieString) => cookieString.trim())
            .map((cookieString) => tough_cookie_1.Cookie.parse(cookieString))
            .map((cookie) => cookie?.cookieString() ?? null)
            .join('; ') ?? null;
        return option1;
    }
    async getOption2(response) {
        const view = cheerio.load(await response.text());
        const option2 = view(tracker_constants_1.VIEW_INPUT.DATA).val();
        return option2;
    }
    async optionSetting() {
        try {
            const mainPageResponse = await this.mainPageFetch();
            const option1 = await this.getOption1(mainPageResponse);
            const option2 = await this.getOption2(mainPageResponse);
            return { option2, option1 };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
TrackerOptionsService = __decorate([
    (0, common_1.Injectable)()
], TrackerOptionsService);
exports.TrackerOptionsService = TrackerOptionsService;
//# sourceMappingURL=tracker-options.service.js.map