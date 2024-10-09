import { IsNotEmpty, IsNumber } from "class-validator";
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
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Spirit {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  public id: string;

  @Column({ type: "varchar", length: 250, unique: true, nullable: false })
  @IsNotEmpty()
  @Expose()
  public name: string;

  @Column({ type: "int", nullable: false, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  public furyokuLevel: number;

  @Column({ type: "enum", enum: SpiritClass, nullable: false })
  @IsNotEmpty()
  @Expose()
  public class: SpiritClass;

  @Column({ type: "int", nullable: true, default: 1 })
  @Expose()
  public level: number;

  @ManyToMany(() => Shaman, (shaman) => shaman.guardianSpirits)
  @Expose()
  public shamans: Shaman[];

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
