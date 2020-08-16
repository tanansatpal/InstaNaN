import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from '@posts/posts.service';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { PostDto } from '@posts/dto/post.dto';
import { PostListDto } from '@posts/dto/post-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@users/dto/user.dto';
import { ObjectID } from 'typeorm/index';

@Controller('api/posts')
export class PostsController {

  constructor(private postsService: PostsService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<PostListDto> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: ObjectID): Promise<PostDto> {
    return await this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreatePostDto, @Req() req: any): Promise<PostDto> {
    const user = <UserDto>req.user;
    return await this.postsService.createPost(user, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async destroy(@Param('id') id: ObjectID): Promise<PostDto> {
    return await this.postsService.destroyPost(id);
  }
}
