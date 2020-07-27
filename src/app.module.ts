import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
  ConfigModule.forRoot(),
  TasksModule,
  MongooseModule.forRoot(`mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}?retryWrites=true&w=majority`),
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
