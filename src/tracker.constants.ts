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
      invcNo: string; // 운송장번호
      sendrNm: string; // 보내는 분
      qty: string; // 수량
      itemNm: string; // 품목
      rcvrNm: string; // 받는 분
      rgmailNo: string; // 우편번호
      oriTrspbillnum: string; // 원운송장번호
      rtnTrspbillnum: string; // 반송장번호
      nsDlvNm: string; // 택배사
    }[];
    paramInvcNo: string; // 운송장번호
  };
  parcelDetailResultMap: {
    resultList: {
      nsDlvNm: string; // 택배사
      crgNm: string; // 집하
      crgSt: string; // 집하상태
      dTime: string; // 집하일시
      empImgNm: string; // 집하사원
      regBranId: string; // 집하지점ID
      regBranNm: string; // 집하지점명
      scanNm: string; // 스캔
    }[];
    paramInvcNo: string; // 운송장번호
  };
};

export type INVALID_WAYBILL_RETURN_TYPE = {
  waybillNumber: string; // 운송장번호
  message: string; // 메세지
};

export type PARCEL_LIST_RETURN_TYPE = {
  result: PARCEL_RETURN_TYPE[];
  invalidWaybillNumber: INVALID_WAYBILL_RETURN_TYPE[];
};
