import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm"
import { Users } from './entities/user.entity';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ){}

    async createUser(createUserDto: CreateUserDto){
        try{
            const user = this.usersRepository.create(createUserDto)
            await this.usersRepository.save(user)
            return await this.usersRepository.findOne({
                where: {id: user.id}
            })
        }catch(err){
            throw new HttpException(
                "Usuário já cadastrado.",
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async deleteUser(userId: string){
        return await this.usersRepository.delete({id: userId})
    }

    async getUserById(userId: string){
        const user = await this.usersRepository.findOne({
            where: {id: userId}
        }) 
        return user
    }

    async getUserByNameForValidateAuth(user_name:string){
        const user = await this.usersRepository.findOneOrFail({
            where: {user_name: user_name},
            select: ["id", "user_name", 'password']
        })
        return user
    }
}
