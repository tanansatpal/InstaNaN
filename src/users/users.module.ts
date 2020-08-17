import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@users/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { FollowersEntity } from '@users/entity/followers.entity';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, FollowersEntity]),
    AuthModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {
}
