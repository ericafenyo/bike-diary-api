import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CreatedDate {
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}

export class UpdatedDate {
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export class CreatedUpdatedDates {
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
