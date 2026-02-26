import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { get } from "http";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";



@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
        findAll(){
        return this.userService.findAll()
    }

    @Get(':id')
        findOne(
        @Param('id', new ParseUUIDPipe({ version: '4' }))id: string
    ){
        return this.userService.findOne(id)
    }

   @Post()
        createUser(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Put(':id')
        updatePassword(
            @Param('id', new ParseUUIDPipe({ version: '4' }))id: string,
            @Body() dto: UpdatePasswordDto
        ) {
        return this.userService.updatePassword(id, dto);
    }

    @Delete(':id')
        @HttpCode(204)
        remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        this.userService.deleteUser(id);
    }

}