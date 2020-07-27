import { Controller, Get, Post, Req, Patch, Logger, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from '../app/services/tasks.service';
import { Task , TaskStatus } from '../domain/models/task.interface';
import { CreateTaskDto } from '../domain/dto/create-task-dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Tasks')
@Controller('/tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    getAllTaks(@Req() req):Promise<Task[]>{
        let data  = this.taskService.getAllTasks();
         return data;
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string):Promise<Task>{
        try{
            return this.taskService.getTaskById(id);
        }catch(Exception){
            throw new HttpException("Exception",HttpStatus.CONFLICT);
        }
    }

    @ApiOperation({ summary: 'Create Task'})
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto) {
        let data = this.taskService.createTask(createTaskDto);
        Logger.log(data);
        return data;
    }


    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,

    ):Task{
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        this.taskService.deleteTask(id);
    }

   
  
}
