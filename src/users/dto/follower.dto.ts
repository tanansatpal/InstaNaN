import { IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';

export class FollowerDto {
  @IsNotEmpty() _id: ObjectID;
  @IsNotEmpty() follower: ObjectID;
  @IsNotEmpty() target: ObjectID;
}
