import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../../domain/dto/login-user.dto';
import { UserService } from 'src/users/app/services/userService';
import *  as  bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

 constructor(private userService: UserService){};

 async login(loginUserDto: LoginUserDto){
     let result = await this.userService.findByEmail(loginUserDto.email);
     if(!result) throw new NotFoundException();
     
     let checkPass = await bcrypt.compare(loginUserDto.password, result.password);
    if(! checkPass) throw new UnauthorizedException();


    return result;
 }


}
