import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { LoginUserDto } from '../../domain/dto/login-user.dto';
import { UserService } from 'src/users/app/services/userService';

@Injectable()
export class AuthService {

 constructor(private userService: UserService){};

 async login(loginUserDto: LoginUserDto){
     let result = await this.userService.findByEmail(loginUserDto.email);
     if(!result) throw new NotFoundException();
    return result;
 }


}
