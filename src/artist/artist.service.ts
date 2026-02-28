import { Inject, Injectable } from '@nestjs/common';
import { Artist, IArtistRepository, } from 'src/shared/interfaces';
import { randomUUID } from 'crypto';
import { httpErrors } from 'src/shared/handle-errors';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ARTIST_REPOSITORY } from './artist.constants';

@Injectable()
export class ArtistService {

  constructor(
    @Inject(ARTIST_REPOSITORY)        
    private artistRepository: IArtistRepository, 
  ) {}


  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.artistRepository.create({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    return newArtist;
  }

  async findAll(): Promise<Artist[]>{
    const artists = await this.artistRepository.findAll()
    return artists

  }
  
  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findById(id);

    if (!artist) throw httpErrors.notFound('Artist not found');
    return artist
  }

    async updateArtist(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist =  await this.artistRepository.findById(id)
    if (!artist) throw httpErrors.notFound('Artist not found');

    
   const updatedArtist = await this.artistRepository.update(id, {
      name: dto.name ?? artist.name,
      grammy: dto.grammy ?? artist.grammy,
    });

    return updatedArtist;
  
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findById(id)
    if (!artist) throw httpErrors.notFound('artist not found');
    await this.artistRepository.delete(id)
  }

}
