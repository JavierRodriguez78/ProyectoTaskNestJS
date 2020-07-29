import { Controller, Post, HttpException, HttpStatus, Logger, Body, Get, UseGuards, Req } from '@nestjs/common';
import { RegisterUserDto } from '../domain/dto/regiser-user-dto';
import { UserService } from '../app/services/userService';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../domain/models/user.interface';
import { userSchema } from '../infraestructure/MongoDB/user.schema';


@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UserService){}

    @Post()
    @ApiResponse({ status: 201, description: 'El usuario se ha creado'})
    @ApiResponse({ status: 409, description:"El usuario ya existe"})
    @ApiCreatedResponse({
        description:"Usuario creado",
        type: "userSchema",
    })
    registerUser(
        @Body() registerUserDto: RegisterUserDto) {
            try{
                let data = this.userService.registerUser(registerUserDto);
                Logger.log(data);
        return data;
            }catch(Exception){
                throw new HttpException("Exception", HttpStatus.CONFLICT);
            }
    }


    @Get()
    @UseGuards(AuthGuard())
    getAllUsers(){
        try{
          return   this.userService.getAllUsers();
        }
        catch(Exception){
            throw new HttpException("Exception", HttpStatus.CONFLICT);
        }
        
    }

    @Get('/guard')
    @UseGuards(AuthGuard())
    getGuarUser(@Req() req: Request){
        Logger.log(JSON.stringify(req['user']));
        return "Entra";
        
    }

}
