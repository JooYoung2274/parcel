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
    async getHeaders(response) {
        const cookieHeaders = response.headers.get('set-cookie')?.split(',').map((cookieString) => cookieString.trim())
            .map((cookieString) => tough_cookie_1.Cookie.parse(cookieString)).map((cookie) => cookie?.cookieString() ?? null)
            .join('; ') ?? null;
        return cookieHeaders;
    }
    async getCsrf(response) {
        const view = cheerio.load(await response.text());
        const csrf = view(tracker_constants_1.VIEW_INPUT.DATA).val();
        return csrf;
    }
    async optionSetting() {
        try {
            const mainPageResponse = await this.mainPageFetch();
            const cookieHeaders = await this.getHeaders(mainPageResponse);
            const csrf = await this.getCsrf(mainPageResponse);
            return { csrf, cookieHeaders };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getParams(waybillNumber, csrf) {
        const queryString = new url_1.URLSearchParams({ paramInvcNo: waybillNumber, _csrf: csrf }).toString();
        return queryString;
    }
    async parcelTracker(waybillNumber, csrf, cookieHeaders) {
        if (!(waybillNumber.length === 12 || waybillNumber.length === 10)) {
            throw new common_1.BadRequestException('waybillNumber is invalid');
        }
        const queryString = await this.getParams(waybillNumber, csrf);
        const res = await axios_1.default.post(`${tracker_constants_1.PARCEL_URL.DETAIL}?${queryString}`, {}, {
            headers: {
                cookie: cookieHeaders,
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