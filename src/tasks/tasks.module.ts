import { Module } from '@nestjs/common';
import { TasksController } from './UI/tasks.controller';
import { TasksService } from './app/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './infraestructure/MongoDB/task.schema';
import { JwtStrategy } from '../auth/app/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:[
    MongooseModule.forFeature([{name:'Task', schema: taskSchema}]),
    PassportModule.register({defaultStrategy:'jwt', session: false}),
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
