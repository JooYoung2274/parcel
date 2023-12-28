export const PARCEL_URL = {
  MAIN: 'https://www.cjlogistics.com/ko/tool/parcel/tracking',
  DETAIL: 'https://www.cjlogistics.com/ko/tool/parcel/tracking-detail',
};

export const VIEW_INPUT = {
  DATA: 'input[name=_csrf]',
};

export type TRACK_MODULE_OPTIONS = {
  rateLimit: number;
};

export type PARCEL_RETURN_TYPE = {
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

export type INVALID_WAYBILL_RETURN_TYPE = {
  waybillNumber: string;
  message: string;
};

export type PARCEL_LIST_RETURN_TYPE = {
  result: PARCEL_RETURN_TYPE[];
  invalidWaybillNumber: INVALID_WAYBILL_RETURN_TYPE[];
};
