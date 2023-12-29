## 택배조회

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
import { TrackerModule } from 'parcel-data-test5';

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
import { TrackerService } from 'parcel-data-test5';

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
