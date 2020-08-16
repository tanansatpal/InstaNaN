import { IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm/index';
import { Optional } from '@nestjs/common';

export class PostDto {
  @IsNotEmpty() _id: ObjectID;
  @IsNotEmpty() description: string;
  @IsNotEmpty() createdOn: Date;
  @IsNotEmpty() likes: number;
  @IsNotEmpty() comments: number;
  @Optional() updatedOn: Date;
}
