import { IsNotEmpty, IsOptional } from "class-validator";
import { Users } from "src/users/entities/user.entity";


export class CreateTodoDTO {

    @IsNotEmpty()
    user_name: Users;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    done: boolean;
}