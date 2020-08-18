import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ObjectID } from 'typeorm/index';
import { UserService } from '@users/user.service';
import { UserDto } from '@users/dto/user.dto';
import { PostsService } from '@posts/posts.service';
import { FollowingsListDto } from '@users/dto/followings-list.dto';
import { PostListDto } from '@posts/dto/post-list.dto';
import { FanoutOnReadService } from './services/fanout-on-read/fanout-on-read.service';
import { FanoutOnWriteSizedBucketsService } from './services/fanout-on-write-sized-buckets/fanout-on-write-sized-buckets.service';
import { FanoutOnWriteTimeBucketsService } from './services/fanout-on-write-time-buckets/fanout-on-write-time-buckets.service';
import { FanoutOnWriteToCacheService } from './services/fanout-on-write-to-cache/fanout-on-write-to-cache.service';

@Injectable()
export class FeedService {

  serviceOptions;

  constructor(@Inject(forwardRef(() => UserService)) private userService: UserService, private postsService: PostsService) {
    // these are the different techniques that generates the user feeds
    this.serviceOptions = {
      fanoutOnRead: new FanoutOnReadService(userService, postsService),
      fanoutOnWriteSizedBucket: new FanoutOnWriteSizedBucketsService(),
      fanoutOnWriteTimeBucket: new FanoutOnWriteTimeBucketsService(),
      fanoutOnWriteToCache: new FanoutOnWriteToCacheService(),
    };
  }

  public async getFeedFor(user: UserDto, limit?: number, anchor?: ObjectID): Promise<PostListDto> {
    const service = this.serviceOptions.fanoutOnRead;
    return service.getFeedFor(user, limit, anchor);
  }
}
