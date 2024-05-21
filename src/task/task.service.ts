import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
    ) {}

    async addTask(name: string, userId: string, priority: number): Promise<void> {
        const existingTask = await this.taskModel.findOne({ name });
        if (existingTask) {
            throw new ConflictException('Task already exists');
        }
        
        const newTask = new this.taskModel({
            name,
            userId,
            priority,
        });
        await newTask.save();
    }

    async getTaskByName(name: string): Promise<Task> {
        return this.taskModel.findOne({ name }).exec();
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        return this.taskModel.find({ userId }).exec();
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({}).exec();
    }
}
