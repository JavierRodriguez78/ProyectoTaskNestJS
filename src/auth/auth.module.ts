import { Module } from '@nestjs/common';
import { AuthController } from './UI/auth.controller';
import { AuthService } from './app/services/auth.service';
import { UsersModule } from '../users/users.module';
import { UserService } from 'src/users/app/services/userService';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './app/strategies/jwt.strategy';



@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt', session:false}),
    JwtModule.register({
      secretOrPrivateKey:'estaesmiphrassecreate',
      signOptions:{
        expiresIn: 3600
      }
    }),
    UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
