import { Controller, Post, HttpException, HttpStatus, Logger, Body, Get } from '@nestjs/common';
import { RegisterUserDto } from '../domain/dto/regiser-user-dto';
import { UserService } from '../app/services/userService';


@Controller('users')
export class UsersController {

    constructor(private userService: UserService){}

    @Post()
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
    getAllUsers(){
        try{
          return   this.userService.getAllUsers();
        }
        catch(Exception){
            throw new HttpException("Exception", HttpStatus.CONFLICT);
        }
        
    }

}
