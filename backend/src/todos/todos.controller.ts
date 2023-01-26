import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/user/:userId')
  async createTodo(@Body() body: CreateTodoDTO, @Param('userId') userId: string ){
    return this.todosService.createTodo(body, userId)
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
