import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User Registered', type: User})
  @ApiResponse({ status: 400, description: 'Invalid user data'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'User Logged', type: User})
  @ApiResponse({ status: 400, description: 'Invalid credentials'})
  login(@Body() loginUserDto: LoginUserDto){
    return this.usersService.login(loginUserDto)
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User Found', type: User})
  @ApiResponse({ status: 400, description: 'User Not Found'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
