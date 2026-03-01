import { Inject, Injectable } from "@nestjs/common";
import { ArtistService } from "src/artist/artist.service";
import { TrackService } from "src/track/track.service";
import { InMemoryFavoritesRepository } from "./favorites-repository";
import { FAVORITES_REPOSITORY } from "./favorites.constants";
import { FavoritesResponseDto } from "./dto/favorites-response.dto";
import { httpErrors } from "src/shared/handle-errors";

@Injectable()
export class FavoritesService {
    constructor(
        @Inject(FAVORITES_REPOSITORY)
        private favoritesRepository: InMemoryFavoritesRepository,
        private artistService: ArtistService,
        private albumService: AlbumService,
        private trackService: TrackService,
    ) {}

    async getAllFavorites(): Promise<FavoritesResponseDto> {
        const favorites = await this.favoritesRepository.getFavorites();
        const artists = await Promise.all(
        favorites.artists.map(id => this.artistService.findOne(id).catch(() => null))
        );
        
        const albums = await Promise.all(
        favorites.albums.map(id => this.albumService.findOne(id).catch(() => null))
        );
        
        const tracks = await Promise.all(
        favorites.tracks.map(id => this.trackService.findOne(id).catch(() => null))
        );

        return {
        artists: artists.filter(artist => artist !== null),
        albums: albums.filter(album => album !== null),
        tracks: tracks.filter(track => track !== null),
        };
    }

    async addTrack(trackId: string): Promise<void> {
        try {
            await this.trackService.findOne(trackId);
        } catch (error) {
            throw httpErrors.unprocessable('Track does not exist');
        }

        await this.favoritesRepository.addTrack(trackId);
    }

    async addAlbum(albumId: string): Promise<void> {
        try {
        await this.albumService.findOne(albumId);
        } catch (error) {
                throw httpErrors.unprocessable('Album does not exist');
        }

        await this.favoritesRepository.addAlbum(albumId);
    }

    async addArtist(artistId: string): Promise<void> {
        try {
        await this.artistService.findOne(artistId);
        } catch (error) {
            throw httpErrors.unprocessable('Artist does not exist');
        }

        await this.favoritesRepository.addArtist(artistId);
    }

    async removeTrack(trackId: string): Promise<void> {
        const isFavorite = await this.favoritesRepository.isTrackFavorite(trackId);
        
        if (!isFavorite) {
            throw httpErrors.notFound('Track not found in favorites');
        }

        await this.favoritesRepository.removeTrack(trackId);
    }

    async removeAlbum(albumId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isAlbumFavorite(albumId);
    
    if (!isFavorite) {
      throw httpErrors.notFound('Album not found in favorites');
    }

    await this.favoritesRepository.removeAlbum(albumId);
  }

  async removeArtist(artistId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isArtistFavorite(artistId);
    
    if (!isFavorite) {
      throw httpErrors.notFound('Artist not found in favorites');
    }

    await this.favoritesRepository.removeArtist(artistId);
  }

    async removeArtistReference(artistId: string): Promise<void> {
    await this.favoritesRepository.removeArtistReference(artistId);
  }

  async removeAlbumReference(albumId: string): Promise<void> {
    await this.favoritesRepository.removeAlbumReference(albumId);
  }

  async removeTrackReference(trackId: string): Promise<void> {
    await this.favoritesRepository.removeTrackReference(trackId);
  }


}