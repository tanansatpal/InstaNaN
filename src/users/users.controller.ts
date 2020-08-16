import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserPartialDto } from './dto/user.dto';
import { UserListDto } from './dto/user-list.dto';
import { RegisterDto } from '@users/dto/register.dto';

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
  @UsePipes(new ValidationPipe())
  async create(@Body() body: RegisterDto): Promise<UserDto> {
    return await this.userService.createUser(body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.updateUser(id, userDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updatePatch(@Param('id') id: string, @Body() userDto: UserPartialDto): Promise<UserDto> {
    return await this.userService.updatePartialUser(id, userDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.destoryUser(id);
  }
}
