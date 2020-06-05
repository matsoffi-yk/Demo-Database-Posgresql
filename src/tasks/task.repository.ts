import { Repository, EntityRepository } from "typeorm";
import { Rask } from "./task.entity";
import { TaskCreateDto } from "./dto/task-create.dto";
import { TaskStatus } from "./task-status.enum";
import { InternalServerErrorException } from "@nestjs/common";
import { TaskFilterDto } from "./dto/task-filter.dto";

@EntityRepository(Rask)
export class TaskRepository extends Repository<Rask> {

    async createTask(taskCreateDto: TaskCreateDto): Promise<Rask> {
        const { title, description } = taskCreateDto;

        const task: Rask = new Rask();
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

    async getTasksWithFilter(taskFilterDto: TaskFilterDto): Promise<Rask[]> {
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