import { Column, Entity, ObjectIdColumn } from 'typeorm/index';
import { ObjectID } from 'mongodb';

@Entity('followers')
export class FollowersEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  follower: ObjectID;

  @Column()
  target: ObjectID;
}
