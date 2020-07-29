import { Controller, Get, Post, Req, Res, Patch, Logger, Body, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { TasksService } from '../app/services/tasks.service';
import { Task , TaskStatus } from '../domain/models/task.interface';
import { CreateTaskDto } from '../domain/dto/create-task-dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { v1 as uuid} from 'uuid';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tasks')
@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    async getAllTaks(@Req() req:Request, @Res() res: Response){
        let data  = await this.taskService.getAllTasks();

        Logger.log(req['user']);

         res.status(HttpStatus.ACCEPTED).json({
             "type:":"Tasks",
             "id:": uuid(),
             "attributes": data,
         });
         
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string):Promise<Task>{
        try{
            return this.taskService.getTaskById(id);
        }catch(Exception){
            throw new HttpException("Exception",HttpStatus.CONFLICT);
        }
    }

    @ApiOperation({ summary: 'Create Task 1'})
    @Post()
    createTask(@Req() request: Request,
        @Body() createTaskDto: CreateTaskDto) {
            try{
                let data = this.taskService.createTask(createTaskDto, request['user']._id);
                Logger.log(data);
        return data;
            }catch(Exception){
                throw new HttpException("Exception", HttpStatus.CONFLICT);
            }
    }


    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,

    ){
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        try{
        this.taskService.deleteTask(id);
        }catch(Ex){
            throw new HttpException("Exception", HttpStatus.CONFLICT);
        }
    }

   
  
}
