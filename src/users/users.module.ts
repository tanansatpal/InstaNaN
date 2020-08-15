import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { DatastoreModule } from '../datastore/datastore.module';

@Module({
  controllers: [UsersController],
  imports: [DatastoreModule],
  providers: [UserService],
})
export class UsersModule {
}
