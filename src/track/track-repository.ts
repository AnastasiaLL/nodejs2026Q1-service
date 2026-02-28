import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ITrackRepository, Track } from 'src/shared/interfaces';

@Injectable()
export class InMemoryTrackRepository implements ITrackRepository {
  private tracks: Track[] = [];

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findById(id: string): Promise<Track | null> {
    return this.tracks.find(track => track.id === id) || null;
  }

  async create(trackData: Omit<Track, 'id'>): Promise<Track> {
    const newTrack: Track = {
      id: randomUUID(),
      ...trackData,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async update(id: string, trackData: Partial<Track>): Promise<Track | null> {
    const index = this.tracks.findIndex(track => track.id === id);
    if (index === -1) return null;

    this.tracks[index] = { ...this.tracks[index], ...trackData };
    return this.tracks[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tracks.findIndex(track => track.id === id);
    if (index === -1) return false;

    this.tracks.splice(index, 1);
    return true;
  }
}