import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string){
    return this.usersService.getUserById(userId)
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDto){
    return this.usersService.createUser(createUserDTO)
  }
}
