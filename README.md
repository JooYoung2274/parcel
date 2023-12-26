## 택배 운송장 번호 조회

- npm 배포 테스트용 입니다. npm에 없을수도 있습니다.

```
// INSTALL
npm install parcel-info
```

- optionSetting() 
    - headers, query-options 리턴

- parcelTracker(waybillNumber: string, csrf: string, cookieHeaders: any)
    - 조회할 운송장 번호, optionSetting()에서 리턴받은 데이터들 입력


### EXAMPLE

```typescript

import { TrackerService } from 'parcel-info';

const trackerService = new TrackerService();

const { csrf, cookieHeaders } = await this.trackerService.optionSetting();

const data = await this.trackerService.parcelTracker(waybill.number, csrf, cookieHeaders);

```
