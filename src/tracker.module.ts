import { Module, DynamicModule } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerOptionsService } from './tracker-options.service';
import { TrackMoudleOptions } from './tracker.constants';

@Module({})
export class TrackerModule {
  static register(options: TrackMoudleOptions): DynamicModule {
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
