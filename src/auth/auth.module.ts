import { Module } from '@nestjs/common';
import { AuthController } from './UI/auth.controller';
import { AuthService } from './app/services/auth.service';
import { UsersModule } from '../users/users.module';
import { UserService } from 'src/users/app/services/userService';


@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
