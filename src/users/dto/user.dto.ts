import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';

export class UserDto {
  @IsNotEmpty() _id: ObjectID;
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() name: string;
}
