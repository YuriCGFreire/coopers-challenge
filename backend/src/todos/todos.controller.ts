import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/user/:userId')
  async createTodo(@Body() createTodoDTO: CreateTodoDTO, @Param('userId') userId: string ){
    return this.todosService.createTodo(createTodoDTO, userId)
  }

  @Get('/:todoId')
  async getTodoById(@Param('todoId') todoId: string){
    return this.todosService.getTodoById(todoId)
  }

  @Patch('/:todoId')
  async toggleTodoDone(@Param('todoId') todoId: string){
    return this.todosService.toggleTodoDone(todoId)
  }

  @Delete('/user/:userId')
  async deleteAllTodosByUserId(@Param('userId') userId: string){
    return this.todosService.deleteAllTodosByUserId(userId)
  }
}
