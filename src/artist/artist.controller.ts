import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";



@Controller('artist')
export class ArtistController {

    constructor(private artistService: ArtistService){}

    @Get()
        findAll(){
        return this.artistService.findAll()
    }

    @Get(':id')
        findOne(
        @Param('id', new ParseUUIDPipe({ version: '4' }))id: string
    ){
        return this.artistService.findOne(id)
    }

   @Post()
        createArtist(@Body() dto: CreateArtistDto) {
        return this.artistService.create(dto);
    }

    @Put(':id')
        updateArtist(
            @Param('id', new ParseUUIDPipe({ version: '4' }))id: string,
            @Body() dto: UpdateArtistDto
        ) {
        return this.artistService.updateArtist(id, dto);
    }

    @Delete(':id')
        @HttpCode(204)
        remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        this.artistService.deleteArtist(id);
    }

}