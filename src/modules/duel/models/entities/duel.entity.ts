import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { Shaman } from "@modules/shaman/models/entities";
import type { IDuelResult } from "../interfaces";

@Entity()
export class Duel {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({ type: String, description: "Unique identifier for the duel" })
  public id: string;

  @Column({ type: "json" })
  @Expose()
  @ApiProperty({ type: [String], description: "List of Fighters" })
  public fighters: String[];

  @Column({ type: "jsonb" })
  @Expose()
  @ApiProperty({ description: "result of the match" })
  public result: IDuelResult;

  @CreateDateColumn({ type: "timestamp" })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Exclude()
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, default: null })
  @Exclude()
  public deletedAt: Date | null;
}
