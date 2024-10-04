import { IsNotEmpty } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Shaman } from "@modules/shaman/models/entities";
import { SpiritClass } from "../enums/spirit-class.enum";

@Entity()
export class Spirit {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 250, unique: true, nullable: false })
  @IsNotEmpty()
  public name: string;

  @Column({ type: "int", nullable: false, default: 0 })
  @IsNotEmpty()
  public furyokuLevel: number;

  @Column({ type: "enum", enum: SpiritClass, nullable: false })
  @IsNotEmpty()
  public class: SpiritClass;

  @ManyToMany(() => Shaman, (shaman) => shaman.guardianSpirits)
  public shamans: Shaman[];

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true, default: null })
  public deletedAt: Date | null;
}
