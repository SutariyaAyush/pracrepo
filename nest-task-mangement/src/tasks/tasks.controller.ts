import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    // tasksService : TasksService //varible declaration
    // constructor(tasksService:TasksService){
    //     this.tasksService = tasksService
    // } //injected task service into task controller

    // or 

    constructor(private taskService:TasksService){}
    // /tasks    
    @Get()
    getTasks(@Query() filterDto:getTasksFilterDto,@GetUser() user : User):Promise<Task[]>{
        //if we have any filters defined, call tasksService.getTasksWillFilter
      return this.taskService.getTasks(filterDto,user);
    } 

        @Get('/:id')
        getTaskById(@Param('id')id:string,@GetUser() user:User):Promise<Task>{
            return this.taskService.getTaskById(id,user)
        }


    @Delete('/:id')
    deleteTask(@Param('id')id:string,@GetUser() user:User):Promise<void>{
        return this.taskService.deleteTask(id,user)
    }

    @Post()
    createTask(
        @Body() createTaskDto:CreateTaskDto,
        @GetUser() user:User
    ) : Promise<Task> {
        return this.taskService.createTask(createTaskDto,user)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id')id:string,@Body() updateTaskStatusDto:updateTaskStatusDto,@GetUser() user:User):Promise<Task>{
        const {status} = updateTaskStatusDto
        return this.taskService.updateTaskStatus(id,status,user)
    }
}

