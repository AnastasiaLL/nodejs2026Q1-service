import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Artist, IArtistRepository, IUserRepository, User } from 'src/shared/interfaces';

@Injectable()
export class InMemoryArtistRepository implements IArtistRepository {
  private artists: Artist[] = [];

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<Artist | null> {
    return this.artists.find(artist => artist.id === id) || null;
  }

  async create(artistData: Omit<Artist, 'id'>): Promise<Artist> {
    const newArtist: Artist = {
      id: randomUUID(),
      ...artistData,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, artistData: Partial<Artist>): Promise<Artist | null> {
    const index = this.artists.findIndex(artist => artist.id === id);
    if (index === -1) return null;

    this.artists[index] = { ...this.artists[index], ...artistData };
    return this.artists[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.artists.findIndex(artist => artist.id === id);
    if (index === -1) return false;

    this.artists.splice(index, 1);
    return true;
  }
}