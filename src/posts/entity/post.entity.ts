import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm/index';

@Entity('posts')
export class PostEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userId;

  @Column()
  description: string;

  @Column()
  type: string;

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
