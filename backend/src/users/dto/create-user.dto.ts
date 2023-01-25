import { IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";
import { CreateTodoDTO } from "src/todos/dto/create-todo.dto";

export class CreateUserDto {

    @IsNotEmpty()
    user_name: string; 

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
        message: "A senha precisa conter pelos menos uma letra maiúscula, um caractere especial e números"
    })
    password: string;

}