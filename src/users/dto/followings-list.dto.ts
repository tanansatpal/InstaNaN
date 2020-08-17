import { IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm/index';

export class FUserDto {
  @IsNotEmpty() _id: ObjectID;
  @IsNotEmpty() username: string;
  @IsNotEmpty() name: string;
}

export class FollowingsListDto {
  followings: FUserDto[];
}
