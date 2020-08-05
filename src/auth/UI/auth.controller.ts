import { Controller, Post, Body, HttpException, HttpStatus, Logger, Ip, Req } from '@nestjs/common';
import { LoginUserDto } from '../domain/dto/login-user.dto';
import { AuthService } from '../app/services/auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

  
    @Post()
    async login(@Body() loginUserDto:LoginUserDto,   @Req() req: Request){
        let result = await this.authService.login(loginUserDto, req.ip);
        Logger.log("Resultado ->"+ result);
         return result;
    }
}
