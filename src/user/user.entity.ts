import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

import { CreatedUpdatedDates } from "../core/entity";

@Entity()
export class User extends CreatedUpdatedDates {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: "" })
  username: string;

  @Column()
  gender: string;

  @Column({ name: "avatar_path", default: "" })
  avatarPath: string;

  @Column({ default: false })
  activated: boolean;

  @Column({ name: "activation_code", nullable: true })
  activationCode: string;

  @Column({ name: "activated_at", nullable: true })
  activatedAt: Date;

  @Column({ name: "password_reset_code", nullable: true })
  passwordResetCode: string;

  @Column({ name: "last_login", nullable: true })
  lastLogin: Date;

  @Column({ name: "current_login", nullable: true })
  currentLogin: Date;
}
