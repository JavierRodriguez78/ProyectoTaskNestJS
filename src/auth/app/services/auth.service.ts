import { Injectable, NotFoundException, Logger, UnauthorizedException, Request } from '@nestjs/common';
import { LoginUserDto } from '../../domain/dto/login-user.dto';
import { UserService } from 'src/users/app/services/userService';
import *  as  bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from '../../domain/dto/payload.dto';


@Injectable()
export class AuthService {

 constructor(private userService: UserService, private jwtService:JwtService){};

 async login(loginUserDto: LoginUserDto, ip:String){
     let result = await this.userService.findByEmail(loginUserDto.email);
     if(!result) throw new NotFoundException();
     let checkPass = await bcrypt.compare(loginUserDto.password, result.password);
    if(! checkPass) throw new UnauthorizedException();
    result['ip'] = ip;
    return this.createJwtPayload(result);
    
 }


 createJwtPayload(user){
     let data = {
            email : user.email,
            id: user._id,
            iss: "geeekshubsacademy",
            ip: user['ip']
     }
     let jwt = this.jwtService.sign(data);
     return {
         expiresIn: 3600,
         token:jwt
     }

 }


 async validateUserByJwt(payload: JwtPayLoad){
     Logger.log("Entra en validateUserByJWT ----->"+JSON.stringify(payload)); 
    let user = await this.userService.findByEmail(payload.email);
    if(user) return user ;
     throw new UnauthorizedException();
 }

}
