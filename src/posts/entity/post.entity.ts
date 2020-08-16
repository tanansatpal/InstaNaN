import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn } from 'typeorm/index';
import { ObjectID } from 'mongodb';

@Entity('posts')
export class PostEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userId: ObjectID;

  @Column()
  description: string;

  @Column()
  createdOn: Date;

  @Column()
  updatedOn: Date;

  @Column()
  likes: number;

  @Column()
  comments: number;

  @BeforeInsert()
  setInitial() {
    this.createdOn = new Date();
    this.likes = 0;
    this.comments = 0;
  }

  @BeforeUpdate()
  setUpdatedOn() {
    this.updatedOn = new Date();
  }
}
