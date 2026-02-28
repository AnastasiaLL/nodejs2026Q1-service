import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { InMemoryArtistRepository } from './artist-repository';
import { ARTIST_REPOSITORY } from './artist.constants';


@Module({
  controllers: [ArtistController],
  providers: [ArtistService,
    {
      provide: ARTIST_REPOSITORY,  
      useClass: InMemoryArtistRepository, 
    },
  ],
   exports: [ArtistService], 
})
export class ArtistModule {}