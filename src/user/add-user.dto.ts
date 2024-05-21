import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
