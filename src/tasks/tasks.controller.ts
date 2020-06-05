import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Rask } from './task.entity';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskSevice: TasksService) { }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() taskFilterDto: TaskFilterDto
    ): Promise<Rask[]> {
        return this.taskSevice.getTasksWithFilter(taskFilterDto);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() taskCreateDto: TaskCreateDto
    ): Promise<Rask> {
        return this.taskSevice.createTask(taskCreateDto);
    }

    @Get('/:id')
    async getTaskByID(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Rask> {
        return this.taskSevice.getTaskByID(id);
    }

    @Delete('/:id')
    async deleteTask(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.taskSevice.deleteTask(id);
    }

    @Patch('/:id/status')

    async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Rask> {
        return this.taskSevice.updateTaskStatus(id, status);
    }
}
