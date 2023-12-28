import { Module, DynamicModule } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerOptionsService } from './tracker-options.service';
import { TRACK_MODULE_OPTIONS } from './tracker.constants';

@Module({})
export class TrackerModule {
  static register(options: TRACK_MODULE_OPTIONS): DynamicModule {
    return {
      module: TrackerModule,
      providers: [
        {
          provide: TrackerService,
          useValue: new TrackerService(options),
        },
        TrackerOptionsService,
      ],

      exports: [TrackerService],
    };
  }
}
