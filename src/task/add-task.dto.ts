import { IsNotEmpty, IsString, Validate} from 'class-validator';
import { IsPriorityValid } from './isPriorityValid';

export class AddTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsPriorityValid)
    priority: string;
}



