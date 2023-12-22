export declare class TrackerService {
    private mainPageFetch;
    private getHeaders;
    private getCsrf;
    optionSetting(): Promise<{
        csrf: string;
        cookieHeaders: string;
    }>;
    private getParams;
    parcelTracker(waybillNumber: string, csrf: string, cookieHeaders: any): Promise<any>;
}
