import { Injectable, NotFoundException, Logger, BadGatewayException } from '@nestjs/common';
import { Task, TaskStatus } from '../../domain/models/task.interface';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from '../../domain/dto/create-task-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {



    constructor(@InjectModel("Task") private taskModel: Model<Task>){}

    async getAllTasks():Promise<Task[]>
    {
       
        return await  this.taskModel.find({});
    }

    async createTask(createTaskDto:CreateTaskDto, id:String){
        
        const createdTask =  new this.taskModel(createTaskDto);
        const session = await createdTask.db.startSession();
      
        try{
            session.startTransaction();
            let result = await this.taskModel.create([{"title":createTaskDto.title,"description":createTaskDto.description,"status":""}],{session: session})    
            await session.commitTransaction();
        }catch (error){
            Logger.error(error);
            await session.abortTransaction();
            throw new BadGatewayException();
        }finally{
            session.endSession();
        }
    }

    async getTaskById(id: string):Promise<Task>{
         let result =  await this.taskModel.findById(id);
         if(!result) throw new NotFoundException();
         return result;
    }

    async updateTaskStatus(id: string, status: TaskStatus):Promise<Task>{

        let task = await this.getTaskById(id);
        const session = await task.db.startSession();
        try{
            session.startTransaction()
            let result = await task.updateOne({"status":status},{"session":session});
            await session.commitTransaction();
            return result;
        }catch(error){
            session.abortTransaction();
            throw new BadGatewayException();
        }finally{
            session.endSession();
        }
    }

    async deleteTask(id: string):Promise<Task>
    {
      
        let result = await this.taskModel.findByIdAndDelete(id);
        if(!result) throw new NotFoundException();
        return result;
      
    }


}
