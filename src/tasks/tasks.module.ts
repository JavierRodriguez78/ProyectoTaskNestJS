import { Module } from '@nestjs/common';
import { TasksController } from './UI/tasks.controller';
import { TasksService } from './app/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './infraestructure/MongoDB/task.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Task', schema: taskSchema}]),
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
