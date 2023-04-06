import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "src/user/user.entity";
                                                                                                                                                             
@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: string;
}
