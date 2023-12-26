export declare class TrackerService {
    private mainPageFetch;
    private getOption1;
    private getOption2;
    optionSetting(): Promise<{
        option1: string;
        option2: string;
    }>;
    private getParams;
    parcelTracker(waybillNumber: string, option2: string, option1: any): Promise<any>;
}
