import { IsNotEmpty, Min } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Shaman {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsNotEmpty()
  @Min(0)
  public furyokuLevel: number;

  @Column("text", { array: true, default: [] })
  public guardianSpirits: string[];

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, default: null })
  public deletedAt: Date | null;
}
