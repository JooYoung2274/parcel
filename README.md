# parcel-data

- 택배조회 관련 라이브러리 입니다.
- npm 테스트용이라 npm에 없을수도 있습니다.
- 현재는 CJ택배만 조회가능합니다.

### INSTALL

```bash
$ npm install parcel-data
```

<br>

### EXAMPLE

#### module.ts

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackerModule } from 'parcel-data';

@Module({
  imports: [
    TrackerModule.register({
      rateLimit: 2, // api 실패 시 재요청 limit
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### service.ts

```typescript
import { Injectable } from '@nestjs/common';
import { TrackerService } from 'parcel-data';

@Injectable()
export class AppService {
  constructor(private trackerService: TrackerService) {}

  async getParcelData(waybillNumber: string): Promise<PARCEL_RETURN_TYPE> {
    const result = await this.trackerService.parcelTracker(waybillNumber);
    return result;
  }

  async getParcelListData(waybillNumberList: string[]): Promise<PARCEL_LIST_RETURN_TYPE> {
    const result = await this.trackerService.parcelListTracker(waybillNumberList);
    return result;
  }
}
```

<br>

### METHOD

```typescript
parcelTracker(waybillNumber: string): Promise<PARCEL_RETURN_TYPE>
parcelListTracker(waybillNumberList: string[]): Promise<PARCEL_LIST_RETURN_TYPE>
```

### PARCEL_RETURN_TYPE, PARCEL_LIST_RETURN_TYPE

```typescript
type PARCEL_RETURN_TYPE = {
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

type PARCEL_LIST_RETURN_TYPE = {
  result: PARCEL_RETURN_TYPE[];
  invalidWaybillNumber: INVALID_WAYBILL_RETURN_TYPE[];
};

type INVALID_WAYBILL_RETURN_TYPE = {
  waybillNumber: string;
  message: string;
};
```

<br>

## License

This library is licensed under the MIT License.
