import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { DatastoreService } from '../datastore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@users/entity/user.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, DatastoreService],
})
export class UsersModule {
}
