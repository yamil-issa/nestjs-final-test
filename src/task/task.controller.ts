import { Controller, Post, Body, HttpStatus, HttpCode, ValidationPipe, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './add-task.dto';
import { Task } from './task.model';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    // Create a new task
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addTask(@Body(new ValidationPipe()) addTaskDto: AddTaskDto): Promise<void> {
        await this.taskService.addTask(addTaskDto.name, addTaskDto.userId, addTaskDto.priority);
    }

    // Get tasks for a user by user ID
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    async getUserTasks(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<Task[]> {
        return this.taskService.getUserTasks(userId);
    }
}
