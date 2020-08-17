import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Put, Req, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserPartialDto } from './dto/user.dto';
import { UserListDto } from './dto/user-list.dto';
import { RegisterDto } from '@users/dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ObjectID } from 'mongodb';
import { FollowerDto } from '@users/dto/follower.dto';
import { Request } from 'express';

@Controller('api/users')
export class UsersController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<UserListDto> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Body() body: RegisterDto): Promise<UserDto> {
    return await this.userService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.updateUser(id, userDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updatePatch(@Param('id') id: string, @Body() userDto: UserPartialDto): Promise<UserDto> {
    return await this.userService.updatePartialUser(id, userDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async destroy(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.destroyUser(id);
  }

  @Post(':id/follow')
  @UseGuards(AuthGuard('jwt'))
  async followUser(@Param('id') id: string, @Req() req: Request): Promise<FollowerDto> {
    const currentUser = <UserDto>req.user;
    return await this.userService.followUser(currentUser, new ObjectID(id));
  }

  @Post(':id/unfollow')
  @UseGuards(AuthGuard('jwt'))
  async unfollowUser(@Param('id') id: string, @Req() req: Request): Promise<FollowerDto> {
    const currentUser = <UserDto>req.user;
    return await this.userService.unfollowUser(currentUser, new ObjectID(id));
  }
}
