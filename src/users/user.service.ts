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


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity)
              private readonly usersRepo: MongoRepository<UserEntity>) {
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

  public async destoryUser(_id: string): Promise<UserDto> {
    const deleteResult = await this.usersRepo.findOneAndDelete({ _id: new ObjectID(_id) });
    return this.toUserDto(deleteResult.value);
  }

  async findByLogin({ username, password }: LoginDto): Promise<UserDto> {
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


  public toUserDto = (data: UserEntity): UserDto => {
    const { _id, name, email, username } = data;

    return {
      _id,
      name,
      email,
      username,
    };
  };
}
