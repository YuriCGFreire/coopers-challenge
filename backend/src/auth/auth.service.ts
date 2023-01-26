import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {compareSync} from "bcrypt-nodejs"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async validateUser(user_name: string, password: string){
        let user: Users;
        try{
            user = await this.usersService.getUserByNameForValidateAuth(user_name)
        }catch(error){
            return null
        }

        const isPasswordValid = compareSync(password, user.password)

        if(!isPasswordValid) return null 

        return user
    }

    async signIn(user: Users){
        const payload = {sub: user.id, name: user.user_name}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async signUp(createUserDTO: CreateUserDto){
        try{
            return await this.usersService.createUser(createUserDTO)
        }catch{
            throw new HttpException(
                "User already exists.",
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
