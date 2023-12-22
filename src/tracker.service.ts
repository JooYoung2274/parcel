
import axios from 'axios';
import { URLSearchParams } from 'url';
import { Cookie } from 'tough-cookie';
import * as cheerio from 'cheerio';
import { PARCEL_URL,  VIEW_INPUT } from './tracker.constants';

export class TrackerService {
    private async mainPageFetch() {
        return await fetch(PARCEL_URL.MAIN)
    }

    private async getHeaders(response:Response):Promise<string> {
        const cookieHeaders =
            response.headers
                .get('set-cookie')
                ?.split(',')
                .map((cookieString) => cookieString.trim())
                .map((cookieString) => Cookie.parse(cookieString))
                .map((cookie) => cookie?.cookieString() ?? null)
                .join('; ') ?? null;
        return cookieHeaders;
    } 

    private async getCsrf(response:Response):Promise<string> {
        const view = cheerio.load(await response.text());
        const csrf = view(VIEW_INPUT.DATA).val() as string;
        return csrf;
    }

  async optionSetting() : Promise<{
    csrf: string;
    cookieHeaders: string;
  }>{
    try {
      const mainPageResponse = await this.mainPageFetch();
      const cookieHeaders = await this.getHeaders(mainPageResponse);
      const csrf = await this.getCsrf(mainPageResponse);

      return { csrf, cookieHeaders };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async getParams(waybillNumber: string, csrf: string): Promise<string> {
    const queryString = new URLSearchParams({
      paramInvcNo: waybillNumber,
      _csrf: csrf,
    }).toString();

    return queryString;
  }

  async parcelTracker(waybillNumber: string, csrf: string, cookieHeaders: any) {
    if (!(waybillNumber.length === 12 || waybillNumber.length === 10)) {
      throw new Error('waybillNumber is invalid');
    }

   const queryString = await this.getParams(waybillNumber, csrf);

    const res = await axios.post(
      `${PARCEL_URL.DETAIL}?${queryString}`,
      {},
      {
        headers: {
          cookie: cookieHeaders,
        },
      },
    );

    if (!res?.data?.parcelResultMap?.resultList.length) {
      throw new Error(`${waybillNumber} ::: not found`);
    }
    return res?.data
  }
}
