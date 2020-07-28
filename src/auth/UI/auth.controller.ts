import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { LoginUserDto } from '../domain/dto/login-user.dto';
import { AuthService } from '../app/services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    async login(@Body() loginUserDto:LoginUserDto){
        try{
        let result = await this.authService.login(loginUserDto);
        Logger.log(result);
         return result;
    }catch(Exception){
            throw new HttpException("Exception", HttpStatus.CONFLICT);
        }
    }

}
