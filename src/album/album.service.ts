import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Album, IAlbumRepository } from 'src/shared/interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ALBUM_REPOSITORY } from './album.constants';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(ALBUM_REPOSITORY)
    private albumRepository: IAlbumRepository,
    private favoritesService: FavoritesService,
    private trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.albumRepository.create({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ?? null,
    });

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findById(id);
    
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findById(id);
    
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const updatedAlbum = await this.albumRepository.update(id, {
      name: updateAlbumDto.name ?? album.name,
      year: updateAlbumDto.year ?? album.year,
      artistId: updateAlbumDto.artistId ?? album.artistId,
    });

    return updatedAlbum;
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumRepository.findById(id);
    
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    await this.favoritesService.removeAlbumReference(id);
    
    await this.trackService.removeAlbumReference(id);

    await this.albumRepository.delete(id);
  }

  async removeArtistReference(artistId: string): Promise<void> {
    await this.albumRepository.removeArtistReference(artistId);
  }

  async exists(id: string): Promise<boolean> {
    const album = await this.albumRepository.findById(id);
    return !!album;
  }
}