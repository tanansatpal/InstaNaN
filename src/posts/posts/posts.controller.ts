import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from '@posts/posts.service';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { PostDto } from '@posts/dto/post.dto';
import { PostListDto } from '@posts/dto/post-list.dto';

@Controller('api/posts')
export class PostsController {

  constructor(private postsService: PostsService) {
  }

  @Get()
  findAll(): Promise<PostListDto> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostDto> {
    return await this.postsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreatePostDto): Promise<PostDto> {
    return await this.postsService.createPost(body);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<PostDto> {
    return await this.postsService.destoryPost(id);
  }
}
