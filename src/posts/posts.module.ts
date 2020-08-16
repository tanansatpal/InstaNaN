import { Module } from '@nestjs/common';
import { PostsController } from '@posts/posts/posts.controller';
import { PostsService } from '@posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@posts/entity/post.entity';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '@users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity]),
    UsersModule,
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {
}
