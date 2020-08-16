import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, MongoRepository } from 'typeorm/index';
import { toPromise } from '@shared/utils';
import { PostEntity } from '@posts/entity/post.entity';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { PostDto } from '@posts/dto/post.dto';
import { PostListDto } from '@posts/dto/post-list.dto';
import { ObjectID } from 'mongodb';
import { UserService } from '@users/user.service';
import { UserDto } from '@users/dto/user.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity)
              private readonly postsRepo: MongoRepository<PostEntity>, private usersService: UserService) {
  }

  public async createPost({ username }: UserDto, data: CreatePostDto): Promise<PostDto> {
    const { description } = data;

    const { _id: userId } = await this.usersService.findOne({ username });

    const post: PostEntity = await this.postsRepo.create({
      description,
      userId,
    });
    await this.postsRepo.save(post);
    return toPromise(this.toPostDto(post));
  }

  public async findAll(): Promise<PostListDto> {
    const users = await this.postsRepo.find({ take: 20 });
    return { posts: users.map(user => this.toPostDto(user)) };
  }

  public async findOne(criteria: string | number | Date | ObjectID | FindOneOptions<PostEntity> | Partial<PostEntity>, options?: FindOneOptions<PostDto>): Promise<PostDto | undefined> {
    const post = await this.postsRepo.findOne(criteria, options);
    if (!post) {
      throw new HttpException(
        `Post doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.toPostDto(post);
  }

  public async destroyPost(_id: ObjectID): Promise<PostDto> {
    const deleteResult = await this.postsRepo.findOneAndDelete({ _id: new ObjectID(_id) });
    return this.toPostDto(deleteResult.value);
  }

  public toPostDto = (data: PostEntity): PostDto => {
    const { _id, description, createdOn, likes, comments, updatedOn } = data;

    return {
      _id,
      description,
      createdOn,
      updatedOn,
      likes,
      comments,
    };
  };
}
