import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTodoDTO {

    @IsNotEmpty()
    description: string;

    @IsOptional()
    done: boolean;
}