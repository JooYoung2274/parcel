import { DynamicModule } from '@nestjs/common';
export declare class TrackerModule {
    static register(options: {
        rateLimit: number;
    }): DynamicModule;
}
