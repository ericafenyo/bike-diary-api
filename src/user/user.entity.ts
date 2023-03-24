import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  gender: string;

  @Column()
  avatar: string;

  @Column({ default: Date.now })
  createdAt: Date;

  @Column({ default: Date.now })
  updatedAt: Date;
}
