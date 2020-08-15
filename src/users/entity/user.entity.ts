import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
