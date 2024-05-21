import { Controller, Post, Body, HttpStatus, HttpCode, ValidationPipe, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './add-user.dto';
import { User } from './user.model';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Endpoint to create a new user
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addUser(@Body(new ValidationPipe()) addUserDto: AddUserDto): Promise<{ id: string, email: string }> {
        const newUser = await this.userService.addUser(addUserDto.email);
        return { id: newUser._id.toString(), email: newUser.email };
    }

    // Endpoint to get a user by email
    @Get()
    @HttpCode(HttpStatus.OK)
    async getUser(@Body(new ValidationPipe()) addUserDto: AddUserDto): Promise<User> {
        return this.userService.getUser(addUserDto.email);
    }

    // Endpoint to reset data
    @Get('reset')
    @HttpCode(HttpStatus.OK)
    async resetData(): Promise<void> {
        await this.userService.resetData();
    }
}
