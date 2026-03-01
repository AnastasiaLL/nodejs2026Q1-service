import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITrackRepository, Track } from 'src/shared/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TRACK_REPOSITORY } from './track.constants';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(TRACK_REPOSITORY)
    private trackRepository: ITrackRepository,
    private favoritesService: FavoritesService, 
    
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.trackRepository.create({
      name: createTrackDto.name,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
      duration: createTrackDto.duration,
    });

    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findById(id);
    
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackRepository.findById(id);
    
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = await this.trackRepository.update(id, {
      name: updateTrackDto.name ?? track.name,
      artistId: updateTrackDto.artistId ?? track.artistId,
      albumId: updateTrackDto.albumId ?? track.albumId,
      duration: updateTrackDto.duration ?? track.duration,
    });

    return updatedTrack;
  }

  async delete(id: string): Promise<void> {
    const track = await this.trackRepository.findById(id);
    
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    await this.favoritesService.removeArtistReference(id);
    await this.trackRepository.delete(id);
  }

  async removeArtistReference(artistId: string): Promise<void> {
    const tracks = await this.trackRepository.findAll();
    for (const track of tracks) {
      if (track.artistId === artistId) {
        await this.trackRepository.update(track.id, { artistId: null });
      }
    }
  }

  async removeAlbumReference(albumId: string): Promise<void> {
    const tracks = await this.trackRepository.findAll();
    for (const track of tracks) {
      if (track.albumId === albumId) {
        await this.trackRepository.update(track.id, { albumId: null });
      }
    }
  }
}