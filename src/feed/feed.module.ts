import { forwardRef, Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { PostsModule } from '@posts/posts.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    PostsModule,
    forwardRef(() => UsersModule),
  ],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {
}
