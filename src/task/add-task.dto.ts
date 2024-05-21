import { IsNotEmpty, IsInt} from 'class-validator';

export class AddTaskDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsInt()
    priority: number;
}
