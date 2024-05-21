import { Controller, Post, Body, HttpStatus, HttpCode, ValidationPipe, Get, Param, ParseUUIDPipe, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './add-task.dto';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    // Create a new task
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addTask(@Body(new ValidationPipe()) addTaskDto: AddTaskDto): Promise<{ name: string, id: string, priority: number }> {
        try {
            const newTask = await this.taskService.addTask(addTaskDto.name, addTaskDto.userId, addTaskDto.priority);
            return {
                name: newTask.name,
                id: newTask._id.toString(),
                priority: newTask.priority
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException('Task already exists');
            } else {
                throw new BadRequestException('Invalid request');
            }
        }
    }

    // Get tasks for a user by user ID
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    async getUserTasks(@Param('userId') userId: string): Promise<{ name: string, id: string, priority: number }[]> {
        if (!this.isValidUserId(userId)) {
            throw new BadRequestException('Invalid userId');
        }
        
        const tasks = await this.taskService.getUserTasks(userId);
        if (!tasks || tasks.length === 0) {
            throw new NotFoundException('No tasks found for the given userId');
        }

        return tasks.map(task => ({
            name: task.name,
            id: task._id.toString(),
            priority: task.priority
        }));
    }

    private isValidUserId(userId: string): boolean {
        // Check if the user ID is not empty
        if (!userId) {
            return false;
        }

        // Check if the user ID is a valid mongoDB ID
        const mongoDBIdRegex = /^[0-9a-fA-F]{24}$/;
        return mongoDBIdRegex.test(userId);

    }
}
