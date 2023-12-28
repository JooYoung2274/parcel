import { BadRequestException, Injectable } from '@nestjs/common';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { URLSearchParams } from 'url';
import { PARCEL_LIST_RETURN_TYPE, PARCEL_RETURN_TYPE, PARCEL_URL, TRACK_MODULE_OPTIONS } from './tracker.constants';
import { TrackerOptionsService } from './tracker-options.service';

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}

@Injectable()
export class TrackerService {
  private trackerOptionsService = new TrackerOptionsService();
  private option1: string;
  private option2: string;
  private waybillNumber: string;
  private axios: AxiosInstance;

  constructor(private options: TRACK_MODULE_OPTIONS) {
    this.trackerOptionsService.optionSetting().then((options) => {
      this.option1 = options.option1;
      this.option2 = options.option2;
    });
    this.axiosSetting(this.options.rateLimit);
  }

  async axiosSetting(MAX_RETRY_COUNT: number): Promise<void> {
    this.axios = Axios.create();
    this.axios.interceptors.response.use(undefined, async (error: AxiosError) => {
      const config = error.config as AxiosCustomRequestConfig;
      config.retryCount = config.retryCount ?? 0;

      const shouldRetry = config.retryCount < MAX_RETRY_COUNT;
      if (shouldRetry) {
        const { option1, option2 } = await this.trackerOptionsService.optionSetting();
        this.option1 = option1;
        this.option2 = option2;

        const queryString = await this.getParams();

        config.url = `${PARCEL_URL.DETAIL}?${queryString}`;
        config.headers = {
          cookie: this.option1,
        };
        config.retryCount += 1;

        return this.axios.request(config);
      }

      return Promise.reject(error);
    });
  }

  private async getParams(): Promise<string> {
    const queryString = new URLSearchParams({ paramInvcNo: this.waybillNumber, _csrf: this.option2 }).toString();
    return queryString;
  }

  async parcelTracker(waybillNumber: string): Promise<PARCEL_RETURN_TYPE> {
    this.waybillNumber = waybillNumber;
    if (!(this.waybillNumber.length === 12 || this.waybillNumber.length === 10)) {
      throw new BadRequestException(`${this.waybillNumber} ::: waybillNumber is invalid (length == 10 | 12)`);
    }
    const queryString = await this.getParams();

    const res = await this.axios.request({
      url: `${PARCEL_URL.DETAIL}?${queryString}`,
      method: 'POST',
      headers: {
        cookie: this.option1,
      },
    });

    if (!res?.data?.parcelResultMap?.resultList.length) {
      throw new BadRequestException(`${this.waybillNumber} ::: waybillNumber not found`);
    }
    return res.data;
  }

  async parcelListTracker(waybillNumberList: string[]): Promise<PARCEL_LIST_RETURN_TYPE> {
    let result = [];
    let invalidWaybillNumber = [];
    for (let i = 0; i < waybillNumberList.length; i++) {
      this.waybillNumber = waybillNumberList[i];
      if (!(this.waybillNumber.length === 12 || this.waybillNumber.length === 10)) {
        invalidWaybillNumber.push({
          waybillNumber: this.waybillNumber,
          message: 'waybillNumber is invalid (length == 10 | 12)',
        });
        continue;
      }

      const queryString = await this.getParams();

      const res = await this.axios.request({
        url: `${PARCEL_URL.DETAIL}?${queryString}`,
        method: 'POST',
        headers: {
          cookie: this.option1,
        },
      });
      if (!res?.data?.parcelResultMap?.resultList.length) {
        invalidWaybillNumber.push({
          waybillNumber: this.waybillNumber,
          message: 'waybillNumber not found',
        });
        continue;
      }
      result.push(res.data);
    }
    return { result, invalidWaybillNumber };
  }
}
