import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, MongoRepository } from 'typeorm/index';
import { toPromise } from '@shared/utils';
import { PostEntity } from '@posts/entity/post.entity';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { PostDto } from '@posts/dto/post.dto';
import { PostListDto } from '@posts/dto/post-list.dto';
import { ObjectID } from 'mongodb';
import { UserDto } from '@users/dto/user.dto';
import { FUserDto } from '@users/dto/followings-list.dto';

enum SortOrder {
  ASCENDING = 1,
  DESCENDING = -1
}

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity)
              private readonly postsRepo: MongoRepository<PostEntity>) {
  }

  public async createPost({ _id: userId }: UserDto, data: CreatePostDto): Promise<PostDto> {
    const { description } = data;

    const post: PostEntity = await this.postsRepo.create({
      description,
      userId,
    });
    await this.postsRepo.save(post);
    return toPromise(this.toPostDto(post));
  }

  public async findAll(): Promise<PostListDto> {
    const users = await this.postsRepo.find();
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

  // public async getFeedForSingleUser(user: ObjectID) {
  //
  // }

  public async getFeedForMultipleUsers(users: FUserDto[], anchor: ObjectID, limit: number): Promise<PostListDto> {
    if (!users.length) {
      return { posts: [] };
    }
    if (anchor == null && limit < 0) {
      return { posts: [] };
    }

    const _ids = users.map(u => u._id);

    const posts = await this.postsRepo.find({ userId: { $in: _ids } });

    let order: SortOrder = null;

    if (anchor == null) {
      order = SortOrder.DESCENDING;
    } else if (limit > 0) {
      order = SortOrder.DESCENDING;
    } else {
      order = SortOrder.ASCENDING;
    }

    return this.toPostsListDto(posts, order);
  }

  public toPostDto(data: PostEntity): PostDto {
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

  private toPostsListDto(posts: PostEntity[], order: SortOrder): PostListDto {
    let data = posts.map(p => this.toPostDto(p));
    if (order == SortOrder.ASCENDING) {
      data = data.reverse();
    }
    return { posts: data };
  }
}
