import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Todos } from './entities/todo.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todos)
        private readonly todosRepository: Repository<Todos>
    ){}

    async createTodo(createTodoDTO: CreateTodoDTO, userId: string){
        const todo = this.todosRepository.create({...createTodoDTO, user: {id: userId}})
        await this.todosRepository.save(todo)
        return await this.todosRepository.findOne({
            where: {id: todo.id}
        })
    }

    async getTodoById(todoId: string){
        return await this.todosRepository.findOne({
            where: {id: todoId}
        })
    }
    
    // Change the column done of Todo entity  
    async toggleTodoDone(todoId: string){
        const todo = await this.todosRepository.findOne({where: {id: todoId}})
        todo.done = !todo.done
        return await this.todosRepository.save(todo)
    }

    async deleteAllTodosByUserId(userId: string){
        return await this.todosRepository.delete({user: {id: userId}})
    }
}
