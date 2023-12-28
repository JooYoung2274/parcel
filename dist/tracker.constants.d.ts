export declare const PARCEL_URL: {
    MAIN: string;
    DETAIL: string;
};
export declare const VIEW_INPUT: {
    DATA: string;
};
export declare type TRACK_MODULE_OPTIONS = {
    rateLimit: number;
};
export declare type PARCEL_RETURN_TYPE = {
    parcelResultMap: {
        resultList: {
            invcNo: string;
            sendrNm: string;
            qty: string;
            itemNm: string;
            rcvrNm: string;
            rgmailNo: string;
            oriTrspbillnum: string;
            rtnTrspbillnum: string;
            nsDlvNm: string;
        }[];
        paramInvcNo: string;
    };
    parcelDetailResultMap: {
        resultList: {
            nsDlvNm: string;
            crgNm: string;
            crgSt: string;
            dTime: string;
            empImgNm: string;
            regBranId: string;
            regBranNm: string;
            scanNm: string;
        }[];
        paramInvcNo: string;
    };
};
export declare type INVALID_WAYBILL_RETURN_TYPE = {
    waybillNumber: string;
    message: string;
};
export declare type PARCEL_LIST_RETURN_TYPE = {
    result: PARCEL_RETURN_TYPE[];
    invalidWaybillNumber: INVALID_WAYBILL_RETURN_TYPE[];
};
