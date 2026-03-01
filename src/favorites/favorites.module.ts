import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { InMemoryFavoritesRepository } from './favorites-repository';
import { FAVORITES_REPOSITORY } from './favorites.constants';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: FAVORITES_REPOSITORY,
      useClass: InMemoryFavoritesRepository,
    },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}