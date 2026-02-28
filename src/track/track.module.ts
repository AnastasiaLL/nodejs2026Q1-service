import { Module } from '@nestjs/common';
import { InMemoryTrackRepository } from './track-repository';
import { TRACK_REPOSITORY } from './track.constants';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: TRACK_REPOSITORY,
      useClass: InMemoryTrackRepository,
    },
  ],
  exports: [TrackService],
})
export class TrackModule {}