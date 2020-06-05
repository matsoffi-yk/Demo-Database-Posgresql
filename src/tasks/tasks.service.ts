import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Rask } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskStatus } from './task-status.enum';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository
    ) { }

    async getTasksWithFilter(taskFilterDto: TaskFilterDto): Promise<Rask[]> {
        return this.taskRepository.getTasksWithFilter(taskFilterDto);
    }
    
    async getTaskByID(id: number): Promise<Rask> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task ID "${id}" Not Found.`);
        }
        return found;
    }

    async createTask(taskCreateDto: TaskCreateDto): Promise<Rask> {
        return this.taskRepository.createTask(taskCreateDto);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" Not Found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Rask> {
        const task = await this.getTaskByID(id);
        task.status = status;
        try {
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
        return task;
    }
}
