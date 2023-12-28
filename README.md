## 택배조회

- 택배조회 관련 라이브러리 입니다.
- npm 테스트용이라 npm에 없을수도 있습니다.

### INSTALL

```bash
$ npm install parcel-data
```

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
      rateLimit: 5, // api 실패 시 재요청 limit
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

  async getParcelData(waybillNumber: string): Promise<PRACEL_RETURN_TYPE> {
    const result = await this.trackerService.parcelTracker(waybillNumber);
    return result;
  }

  async getParcelListData(waybillNumberList: string[]): Promise<PRACEL_RETURN_TYPE[]> {
    const result = await this.trackerService.parcelListTracker(waybillNumberList);
    return result;
  }
}
```

### METHOD

```typescript
parcelTracker(waybillNumber: string): Promise<PARCEL_RETURN_TYPE>
parcelListTracker(waybillNumberList: string[]): Promise<PARCEL_RETURN_TYPE[]>
```
