import { Controller, Get, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string){
    return this.usersService.getUserById(userId)
  }
}
