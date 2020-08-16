import { UserEntity } from '@users/entity/user.entity';
import { UserDto } from '@users/dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { _id, name, email, username } = data;
  return { _id, name, email, username };
};
