"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("./task-status.enum");
const task_entity_1 = require("./task.entity");
const typeorm_1 = require("typeorm");
let TasksService = class TasksService {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    async getTasks(filterDto, user) {
        const taskrepository = this.datasource.getRepository(task_entity_1.Task);
        const { status, search } = filterDto;
        const query = taskrepository.createQueryBuilder('task');
        if (status)
            query.andWhere('task.status = :status', { status });
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async getTaskById(id, user) {
        const taskrepository = this.datasource.getRepository(task_entity_1.Task);
        const found = await taskrepository.findOne({ where: { id, user } });
        if (!found)
            throw new common_1.NotFoundException('task not found');
        return found;
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const taskrepository = this.datasource.getRepository(task_entity_1.Task);
        const task = taskrepository.create({
            title,
            description,
            status: task_status_enum_1.TaskStatus.OPEN,
            user
        });
        await taskrepository.save(task);
        console.log("confirm task is saved", task);
        return task;
    }
    async deleteTask(id, user) {
        const getrepository = this.datasource.getRepository(task_entity_1.Task);
        const result = await getrepository.delete({ id, user });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('task is not found');
        }
    }
    async updateTaskStatus(id, status, user) {
        const taskrepository = this.datasource.getRepository(task_entity_1.Task);
        const task = await this.getTaskById(id, user);
        task.status = status;
        await taskrepository.save(task);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TasksService);
//# sourceMappingURL=tasks.service.js.map