import { IsNotEmpty, IsInt, IsString, Min} from 'class-validator';

export class AddTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    priority: number;
}
