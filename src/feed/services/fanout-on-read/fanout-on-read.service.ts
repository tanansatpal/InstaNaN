import { FeedService } from '../../feed.service';
import { UserDto } from '@users/dto/user.dto';
import { ObjectID } from 'typeorm/index';
import { PostListDto } from '@posts/dto/post-list.dto';
import { FollowingsListDto } from '@users/dto/followings-list.dto';
import { UserService } from '@users/user.service';
import { PostsService } from '@posts/posts.service';

export class FanoutOnReadService {

  constructor(private userService: UserService, private postsService: PostsService) {

  }

  public async getFeedFor(user: UserDto, limit?: number, anchor?: ObjectID): Promise<PostListDto> {
    const { followings }: FollowingsListDto = await this.userService.getFollowings(user, limit);
    return this.postsService.getFeedForMultipleUsers(followings, anchor, limit);
  }
}
