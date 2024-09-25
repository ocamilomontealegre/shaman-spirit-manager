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
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsNotEmpty()
  @Min(0)
  public furyokuLevel: string;

  @Column("text", { array: true, default: [] })
  public guardianSpirits: string[];

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  public deletedAt: Date | null;
}
