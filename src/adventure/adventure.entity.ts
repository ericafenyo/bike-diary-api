import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Location } from "./location.entity";

@Entity()
export class Adventure {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ unique: true })
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  calories: number;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  speed: number;

  @Column()
  polyline: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Location, location => location.adventure)
  locations: Location[];
}
