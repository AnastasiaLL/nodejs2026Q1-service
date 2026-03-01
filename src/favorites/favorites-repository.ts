import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/shared/interfaces';

@Injectable()
export class InMemoryFavoritesRepository {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getFavorites(): Promise<Favorites> {
    return this.favorites;
  }

  async addArtist(artistId: string): Promise<void> {
    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
    }
  }

  async addAlbum(albumId: string): Promise<void> {
    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
    }
  }

  async addTrack(trackId: string): Promise<void> {
    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
    }
  }

  async removeArtist(artistId: string): Promise<boolean> {
    const index = this.favorites.artists.indexOf(artistId);
    if (index === -1) return false;
    
    this.favorites.artists.splice(index, 1);
    return true;
  }

  async removeAlbum(albumId: string): Promise<boolean> {
    const index = this.favorites.albums.indexOf(albumId);
    if (index === -1) return false;
    
    this.favorites.albums.splice(index, 1);
    return true;
  }

  async removeTrack(trackId: string): Promise<boolean> {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index === -1) return false;
    
    this.favorites.tracks.splice(index, 1);
    return true;
  }

  async isArtistFavorite(artistId: string): Promise<boolean> {
    return this.favorites.artists.includes(artistId);
  }

  async isAlbumFavorite(albumId: string): Promise<boolean> {
    return this.favorites.albums.includes(albumId);
  }

  async isTrackFavorite(trackId: string): Promise<boolean> {
    return this.favorites.tracks.includes(trackId);
  }

  async removeArtistReference(artistId: string): Promise<void> {
    await this.removeArtist(artistId);
  }

  async removeAlbumReference(albumId: string): Promise<void> {
    await this.removeAlbum(albumId);
  }

  async removeTrackReference(trackId: string): Promise<void> {
    await this.removeTrack(trackId);
  }
}