import { PARCEL_LIST_RETURN_TYPE, PARCEL_RETURN_TYPE, TRACK_MODULE_OPTIONS } from './tracker.constants';
export declare class TrackerService {
    private options;
    private trackerOptionsService;
    private option1;
    private option2;
    private waybillNumber;
    private axios;
    constructor(options: TRACK_MODULE_OPTIONS);
    private axiosSetting;
    private getParams;
    parcelTracker(waybillNumber: string): Promise<PARCEL_RETURN_TYPE>;
    parcelListTracker(waybillNumberList: string[]): Promise<PARCEL_LIST_RETURN_TYPE>;
}
