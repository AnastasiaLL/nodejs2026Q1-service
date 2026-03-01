import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album, IAlbumRepository } from 'src/shared/interfaces';

@Injectable()
export class InMemoryAlbumRepository implements IAlbumRepository {
  private albums: Album[] = [];

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findById(id: string): Promise<Album | null> {
    return this.albums.find(album => album.id === id) || null;
  }

  async create(albumData: Omit<Album, 'id'>): Promise<Album> {
    const newAlbum: Album = {
      id: randomUUID(),
      ...albumData,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async update(id: string, albumData: Partial<Album>): Promise<Album | null> {
    const index = this.albums.findIndex(album => album.id === id);
    if (index === -1) return null;

    this.albums[index] = { ...this.albums[index], ...albumData };
    return this.albums[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.albums.findIndex(album => album.id === id);
    if (index === -1) return false;

    this.albums.splice(index, 1);
    return true;
  }

  async removeArtistReference(artistId: string): Promise<void> {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].artistId === artistId) {
        this.albums[i].artistId = null;
      }
    }
  }
}