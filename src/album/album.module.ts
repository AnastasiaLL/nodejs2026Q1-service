import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { InMemoryAlbumRepository } from './album-repository';
import { ALBUM_REPOSITORY } from './album.constants';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TrackModule],

  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: ALBUM_REPOSITORY,
      useClass: InMemoryAlbumRepository,
    },
  ],
  exports: [AlbumService],
})
export class AlbumModule {}