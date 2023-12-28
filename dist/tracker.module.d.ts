import { DynamicModule } from '@nestjs/common';
import { TRACK_MODULE_OPTIONS } from './tracker.constants';
export declare class TrackerModule {
    static register(options: TRACK_MODULE_OPTIONS): DynamicModule;
}
