import { Injectable } from '@nestjs/common';
import { DatastoreService } from '../datastore/datastore.service';
import { UserListDto } from './dto/user-list.dto';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {
  private storage;

  constructor(private datastoreService: DatastoreService) {
    this.storage = datastoreService.getStorage();
  }

  public createUser(user: UserDto): Promise<UserDto> {
    return this.storage.add('users', user);
  }

  public findAll(): Promise<UserListDto> {
    return this.storage.get('users');
  }

  public findOne(_id: string): Promise<UserDto> {
    return this.storage.get('users', { _id });
  }

  public updateUser(_id: string, user: UserDto): Promise<UserDto> {
    return this.storage.update('users', { _id }, user);
  }

  public destoryUser(_id: string): Promise<UserDto> {
    return this.storage.delete('users', { _id });
  }
}
