import { Controller, Get, Post, Req, Patch, Logger, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from '../app/services/tasks.service';
import { Task , TaskStatus } from '../domain/models/task.interface';
import { CreateTaskDto } from '../domain/dto/create-task-dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Tasks')
@Controller('/tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    getAllTaks(@Req() req):Task[]{
        let data  = this.taskService.getAllTasks();
        Logger.log(data);
        return data;
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string):Task{
        return this.taskService.getTaskById(id);
    }

    @ApiOperation({ summary: 'Create Task'})
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto):Promise<Task> {
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
