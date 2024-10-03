import { IsNotEmpty, Min } from "class-validator";
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
import { Spirit } from "@modules/spirit/models/entities";

@Entity()
export class Shaman {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 250, unique: true, nullable: false })
  @IsNotEmpty()
  public name: string;

  @Column({ type: "int", nullable: false })
  @IsNotEmpty()
  @Min(0)
  public furyokuLevel: number;

  @ManyToMany(() => Spirit, (spirit) => spirit.shamans, { cascade: true })
  @JoinTable()
  public guardianSpirits: Spirit[];

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, default: null })
  public deletedAt: Date | null;
}
