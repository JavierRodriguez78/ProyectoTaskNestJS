import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Task, TaskStatus } from '../../domain/models/task.interface';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from '../../domain/dto/create-task-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    private tasks: Task[]=[];

    constructor(@InjectModel("Task") private taskModel: Model<Task>){}

    async getAllTasks():Promise<Task[]>
    {
        return await  this.taskModel.find({});
    }

    async createTask(createTaskDto:CreateTaskDto){
        
        const createdTask =  new this.taskModel(createTaskDto);
        const session = await createdTask.db.startSession();
        
        try{
            session.startTransaction();
            let result = await this.taskModel.create([{"title":createTaskDto.title,"description":createTaskDto.description,"status":""}],{session: session})    
            await session.commitTransaction();
        }catch (error){
            Logger.error(error);
            await session.abortTransaction();
        }finally{
            session.endSession();
        }
    }

    async getTaskById(id: string):Promise<Task>{
         let result =  await this.taskModel.findById(id);
         if(!result) throw new NotFoundException();
         return result;
    }

    updateTaskStatus(id: string, status: TaskStatus):Task{


//        const task = this.getTaskById(id);
  //      task.status= status;
        return null;

    }

    deleteTask(id: string)
    {
       // this.tasks = this.tasks.filter( task=>task.id!==id);
    }


}
