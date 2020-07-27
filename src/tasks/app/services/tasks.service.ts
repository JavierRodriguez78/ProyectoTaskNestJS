import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../../domain/models/task.interface';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from '../../domain/dto/create-task-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    private tasks: Task[]=[];

    constructor(@InjectModel("Task") private taskModel: Model<Task>){}

    getAllTasks():Task[]
    {
        return this.tasks;
    }

    async createTask(createTaskDto:CreateTaskDto): Promise<Task>{
        
        const createdTask =  new this.taskModel(createTaskDto);
        return createdTask.save();

      
    }

    getTaskById(id: string):Task{
        //return this.tasks.find(task=>task.id === id);
        return null;
    }

    updateTaskStatus(id: string, status: TaskStatus):Task{


        const task = this.getTaskById(id);
        task.status= status;
        return task;

    }

    deleteTask(id: string)
    {
       // this.tasks = this.tasks.filter( task=>task.id!==id);
    }


}
