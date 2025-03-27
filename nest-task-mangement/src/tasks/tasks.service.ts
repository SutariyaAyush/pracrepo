import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task-status.enum';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    constructor(
        // @InjectRepository(TaskRepository)
        private readonly datasource : DataSource,
    ){}
    // private tasks : Task[] = []

    async getTasks(filterDto:getTasksFilterDto,user:User):Promise<Task[]>{
            const taskrepository = this.datasource.getRepository(Task)
            const {status,search} = filterDto
          const query = taskrepository.createQueryBuilder('task')

          if(status) query.andWhere('task.status = :status',{status})

          if(search){
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                {search:`%${search}%`}
            )
          }  
          const tasks = await query.getMany()
          return tasks
    }
    

 

    async getTaskById(id:string,user:User):Promise<Task> {
        const taskrepository = this.datasource.getRepository(Task)
        const found = await taskrepository.findOne({where:{id,user}})

        if(!found) throw new  NotFoundException('task not found')

        return found
    }


    async createTask(createTaskDto:CreateTaskDto , user :User):Promise<Task>{
        const {title,description} = createTaskDto
        const taskrepository = this.datasource.getRepository(Task)
        const task = taskrepository.create({
            title,
            description, 
            status: TaskStatus.OPEN,
            user
        })
        
        await taskrepository.save(task)
        console.log("confirm task is saved",task);
        return task;
    }

    async deleteTask(id:string,user:User):Promise<void> {//don't want to return anything 
        const getrepository = this.datasource.getRepository(Task)
        const result=await getrepository.delete({id , user});
        if(result.affected === 0){
            throw new NotFoundException('task is not found')
        }
    } 

    async updateTaskStatus(id:string,status:TaskStatus,user:User):Promise<Task>{
        const taskrepository = this.datasource.getRepository(Task)
        const task =await this.getTaskById(id,user)
        task.status = status
        await taskrepository.save(task)
        return task;
    }
}
