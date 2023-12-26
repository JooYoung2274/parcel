"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerService = void 0;
const axios_1 = require("axios");
const url_1 = require("url");
const tough_cookie_1 = require("tough-cookie");
const cheerio = require("cheerio");
const tracker_constants_1 = require("./tracker.constants");
const common_1 = require("@nestjs/common");
class TrackerService {
    async mainPageFetch() {
        return await fetch(tracker_constants_1.PARCEL_URL.MAIN);
    }
    async getOption1(response) {
        const option1 = response.headers.get('set-cookie')?.split(',').map((cookieString) => cookieString.trim())
            .map((cookieString) => tough_cookie_1.Cookie.parse(cookieString)).map((cookie) => cookie?.cookieString() ?? null)
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
    async getParams(waybillNumber, option2) {
        const queryString = new url_1.URLSearchParams({ paramInvcNo: waybillNumber, _csrf: option2 }).toString();
        return queryString;
    }
    async parcelTracker(waybillNumber, option2, option1) {
        if (!(waybillNumber.length === 12 || waybillNumber.length === 10)) {
            throw new common_1.BadRequestException('waybillNumber is invalid');
        }
        const queryString = await this.getParams(waybillNumber, option2);
        const res = await axios_1.default.post(`${tracker_constants_1.PARCEL_URL.DETAIL}?${queryString}`, {}, {
            headers: {
                cookie: option1,
            },
        });
        if (!res?.data?.parcelResultMap?.resultList.length) {
            throw new common_1.BadRequestException(`${waybillNumber} ::: not found`);
        }
        return res.data;
    }
}
exports.TrackerService = TrackerService;
//# sourceMappingURL=tracker.service.js.map