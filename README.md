## 택배 운송장 번호 조회

- npm 배포 테스트용 입니다. npm에 없을수도 있습니다.

```
// INSTALL
npm install parcel-info
```

- optionSetting() 
    - option1, option2 리턴

- parcelTracker(waybillNumber: string, option2: string, option1: any)
    - 조회할 운송장 번호, optionSetting()에서 리턴받은 데이터들 입력


### EXAMPLE

```typescript

import { TrackerService } from 'parcel-info';

const trackerService = new TrackerService();

const { option1, option2 } = await this.trackerService.optionSetting()

const data = await this.trackerService.parcelTracker(WAYBILL_NUMBER, option2, option1);

// WAYBILL_NUMBER -> 운송장 번호

```
