import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Adventure } from "./adventure.entity";
import { Speed } from "./adventure.types";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ unique: true })
  uuid: string;

  @Column({ type: "double precision" })
  latitude: number;

  @Column({ type: "double precision" })
  longitude: number;

  @Column({ type: "double precision" })
  altitude: number;

  @Column({ type: "timestamp" })
  time: number;

  @Column({ type: "simple-json" })
  speed: Speed;

  @Column({ type: "real" })
  accuracy: number;

  @Column({ type: "real" })
  bearing: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Adventure, adventure => adventure.locations)
  @JoinColumn({ name: "adventure_id" })
  adventure: Adventure;
}
