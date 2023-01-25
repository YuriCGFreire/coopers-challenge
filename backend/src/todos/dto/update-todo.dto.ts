import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTodoDTO {
    @IsOptional()
    done: boolean;
}