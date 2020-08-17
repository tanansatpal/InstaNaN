import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserListDto } from './dto/user-list.dto';
import { UserDto, UserPartialDto } from './dto/user.dto';
import { FindOneOptions, MongoRepository } from 'typeorm/index';
import { ObjectID } from 'mongodb';
import { UserEntity } from '@users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '@users/dto/register.dto';
import { toPromise } from '@shared/utils';
import { LoginDto } from '@users/dto/login.dto';
import { compare as comparePasswords } from 'bcrypt';
import { FollowerDto } from '@users/dto/follower.dto';
import { FollowersEntity } from '@users/entity/followers.entity';


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity)
              private readonly usersRepo: MongoRepository<UserEntity>,
              @InjectRepository(FollowersEntity)
              private readonly followersRepo: MongoRepository<FollowersEntity>) {
  }

  public async createUser(data: RegisterDto): Promise<UserDto> {
    const { name, email, username, password } = data;

    // check if the user exists in the db
    const userInDb = await this.usersRepo.findOne({ username });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user: UserEntity = await this.usersRepo.create({
      name, email, username, password,
    });
    await this.usersRepo.save(user);
    return toPromise(this.toUserDto(user));
  }

  public async findAll(): Promise<UserListDto> {
    const users = await this.usersRepo.find({ take: 20 });
    return { users: users.map(user => this.toUserDto(user)) };
  }

  public async findOne(criteria: string | number | Date | ObjectID | FindOneOptions<UserEntity> | Partial<UserEntity>, options?: FindOneOptions<UserDto>): Promise<UserDto | undefined> {
    const user = await this.usersRepo.findOne(criteria, options);
    if (!user) {
      throw new HttpException(
        `User doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.toUserDto(user);
  }

  public async updateUser(_id: string, data: UserDto): Promise<UserDto> {
    const updateResult = await this.usersRepo.findOneAndUpdate({ _id: new ObjectID(_id) }, data, { returnOriginal: false });
    return this.toUserDto(updateResult.value);
  }

  public async updatePartialUser(_id: string, data: UserPartialDto): Promise<UserDto> {
    const updateResult = await this.usersRepo.findOneAndUpdate({ _id: new ObjectID(_id) }, { $set: data }, { returnOriginal: false });
    return this.toUserDto(updateResult.value);
  }

  public async destroyUser(_id: string): Promise<UserDto> {
    const deleteResult = await this.usersRepo.findOneAndDelete({ _id: new ObjectID(_id) });
    return this.toUserDto(deleteResult.value);
  }

  public async findByLogin({ username, password }: LoginDto): Promise<UserDto> {
    const user = await this.usersRepo.findOne({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.toUserDto(user);
  }

  public async followUser({ _id }: UserDto, targetUserId: ObjectID): Promise<FollowerDto> {

    // check if the user exists in the db
    const userInDb = await this.usersRepo.findOne(_id);
    if (!userInDb) {
      throw new HttpException('User doesn\'t exists', HttpStatus.NOT_FOUND);
    }

    const follower: FollowersEntity = await this.followersRepo.create({ follower: _id, target: targetUserId });
    await this.followersRepo.save(follower);

    return this.toFollowerDto(follower);
  }

  public async unfollowUser({ _id }: UserDto, targetUserId: ObjectID): Promise<FollowerDto> {
    const userInDb = await this.usersRepo.findOne(_id);
    if (!userInDb) {
      throw new HttpException('User doesn\'t exists', HttpStatus.NOT_FOUND);
    }

    const targetInDb = await this.usersRepo.findOne(targetUserId);
    if (!targetInDb) {
      throw new HttpException('Following doesn\'t exists', HttpStatus.NOT_FOUND);
    }

    const isFollowing = await this.followersRepo.findOne({ follower: _id, target: targetUserId });
    if (!isFollowing) {
      throw new HttpException('Not following', HttpStatus.NOT_FOUND);
    }

    const deleteResult = await this.followersRepo.findOneAndDelete({ follower: _id, target: targetUserId });
    return this.toFollowerDto(deleteResult.value);
  }

  private toUserDto = (data: UserEntity): UserDto => {
    const { _id, name, email, username } = data;

    return {
      _id,
      name,
      email,
      username,
    };
  };

  private toFollowerDto = (data: FollowersEntity): FollowerDto => {
    const { _id, follower, target } = data;
    return { _id, follower, target };
  };
}
