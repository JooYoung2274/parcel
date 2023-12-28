import { Cookie } from 'tough-cookie';
import * as cheerio from 'cheerio';
import { PARCEL_URL, VIEW_INPUT } from './tracker.constants';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TrackerOptionsService {
  private async mainPageFetch() {
    return await fetch(PARCEL_URL.MAIN);
  }

  private async getOption1(response: Response): Promise<string> {
    const option1 =
      response.headers
        .get('set-cookie')
        ?.split(',')
        .map((cookieString) => cookieString.trim())
        .map((cookieString) => Cookie.parse(cookieString))
        .map((cookie) => cookie?.cookieString() ?? null)
        .join('; ') ?? null;

    return option1;
  }

  private async getOption2(response: Response): Promise<string> {
    const view = cheerio.load(await response.text());
    const option2 = view(VIEW_INPUT.DATA).val() as string;
    return option2;
  }

  async optionSetting(): Promise<{
    option1: string;
    option2: string;
  }> {
    try {
      const mainPageResponse = await this.mainPageFetch();
      const option1 = await this.getOption1(mainPageResponse);
      const option2 = await this.getOption2(mainPageResponse);

      return { option2, option1 };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
