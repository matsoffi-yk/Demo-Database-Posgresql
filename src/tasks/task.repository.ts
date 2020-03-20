import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { TaskCreateDto } from "./dto/task-create.dto";
import { TaskStatus } from "./task-status.enum";
import { InternalServerErrorException } from "@nestjs/common";
import { TaskFilterDto } from "./dto/task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(taskCreateDto: TaskCreateDto): Promise<Task> {
        const { title, description } = taskCreateDto;

        const task: Task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        try {
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return task;
    }

    async getTasksWithFilter(taskFilterDto: TaskFilterDto): Promise<Task[]> {
        const { status, search } = taskFilterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('(task.title like :search OR task.description like :search)', { search: `%${search}%` })
        }

        const tasks = await query.getMany();
        return tasks;
    }
}