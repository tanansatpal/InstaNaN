import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, MongoRepository } from 'typeorm/index';
import { toPromise } from '@shared/utils';
import { PostEntity } from '@posts/entity/post.entity';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { PostDto } from '@posts/dto/post.dto';
import { PostListDto } from '@posts/dto/post-list.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity)
              private readonly postsRepo: MongoRepository<PostEntity>) {
  }

  public async createPost(data: CreatePostDto): Promise<PostDto> {
    const { description } = data;

    const user: PostEntity = await this.postsRepo.create({
      description,
    });
    await this.postsRepo.save(user);
    return toPromise(this.toPostDto(user));
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

  public async destoryPost(_id: string): Promise<PostDto> {
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
