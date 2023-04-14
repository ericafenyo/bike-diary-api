import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../user/user.entity";
import { CreatedUpdatedDates } from "../core/entity";

@Entity()
export class Credential extends CreatedUpdatedDates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
