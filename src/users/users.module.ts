import { Module } from '@nestjs/common';
import { UsersController } from './UI/users.controller';
import { UserService } from './app/services/userService';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './infraestructure/MongoDB/user.schema';
import { PassportModule } from '@nestjs/passport';


@Module({
  
  imports:[
    MongooseModule.forFeature([{name:'User', schema: userSchema}]),
     PassportModule.register({defaultStrategy:'jwt', session: false}),
  ],
  exports: [UserService],
  controllers: [UsersController],
  providers: [UserService]
})
export class UsersModule {}
