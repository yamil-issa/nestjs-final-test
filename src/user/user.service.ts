import { Injectable, NotImplementedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {}

    async addUser(userEmail: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: userEmail });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const email = userEmail;
        const newUser = new this.userModel({
            email
        });
          await newUser.save();
          return newUser;
    }

    async getUser(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    async resetData(): Promise<void> {
        await this.userModel.deleteMany({}).exec();
    }
}
