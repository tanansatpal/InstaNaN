import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserListDto } from './dto/user-list.dto';

@Controller('api/users')
export class UsersController {

  constructor(private userService: UserService) {
  }

  @Get()
  findAll(): Promise<UserListDto> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() body: UserDto): Promise<UserDto> {
    return await this.userService.createUser(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.destoryUser(id);
  }
}
