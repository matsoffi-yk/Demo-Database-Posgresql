import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskSevice: TasksService) { }

    @Get()
    getTasks(
        @Query() taskFilterDto: TaskFilterDto
    ) {
        return this.taskSevice.getTasksWithFilter(taskFilterDto);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() taskCreateDto: TaskCreateDto
    ): Task {
        return this.taskSevice.createTask(taskCreateDto);
    }

    @Get('/:id')
    getTaskByID(
        @Param('id') id: string
    ): Task {
        return this.taskSevice.getTaskByID(id);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: string
    ): void {
        return this.taskSevice.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.taskSevice.updateTaskStatus(id, status);
    }
}
