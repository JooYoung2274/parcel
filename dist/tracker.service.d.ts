import { TrackerOptionsService } from './tracker-options.service';
export declare class TrackerService {
    private options;
    trackerOptionsService: TrackerOptionsService;
    private option1;
    private option2;
    private waybillNumber;
    private axios;
    constructor(options: {
        rateLimit: number;
    });
    axiosSetting(MAX_RETRY_COUNT: number): Promise<void>;
    private getParams;
    parcelTracker(waybillNumber: string): Promise<any>;
    parcelListTracker(waybillNumberList: string[]): Promise<any[]>;
}
