import {
  Body,
  Controller,
  Delete, forwardRef,
  Get, Inject,
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
import { FollowingsListDto } from '@users/dto/followings-list.dto';
import { FollowersListDto } from '@users/dto/followers-list.dto';
import { FeedService } from '../feed/feed.service';
import { PostListDto } from '@posts/dto/post-list.dto';

@Controller('api/users')
export class UsersController {

  constructor(private userService: UserService, @Inject(forwardRef(() => FeedService)) private feedService: FeedService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<UserListDto> {
    return this.userService.findAll();
  }

  @Get('timeline')
  @UseGuards(AuthGuard('jwt'))
  async getUserTimeline(@Req() req: Request): Promise<PostListDto> {
    const currentUser = <UserDto>req.user;
    return await this.feedService.getFeedFor(currentUser);
  }

  @Get('followers')
  @UseGuards(AuthGuard('jwt'))
  async getFollowers(@Req() req: Request): Promise<FollowersListDto> {
    const currentUser = <UserDto>req.user;
    return await this.userService.getFollowers(currentUser);
  }

  @Get('followings')
  @UseGuards(AuthGuard('jwt'))
  async getFollowings(@Param('id') id: string, @Req() req: Request): Promise<FollowingsListDto> {
    const currentUser = <UserDto>req.user;
    return await this.userService.getFollowings(currentUser);
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
