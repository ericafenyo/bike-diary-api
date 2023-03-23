import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Adventure } from "./adventure.entity";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ unique: true })
  uuid: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  altitude: number;

  @Column()
  time: number;

  @Column()
  speed: number;

  @Column()
  accuracy: number;

  @Column()
  bearing: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Adventure, adventure => adventure.locations)
  adventure: Adventure;
}
