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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Spirit {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    type: String,
    description: "Unique identifier for the spirit record",
    example: "eb2fbbc8-6a21-4f45-bca6-a6ed3a4bd21c",
  })
  public id: string;

  @Column({ type: "varchar", length: 250, unique: true, nullable: false })
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ type: String, description: "Name of the spirit" })
  public name: string;

  @Column({ type: "int", nullable: false, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty({ type: Number, description: "Furyoku level of the spirit" })
  public furyokuLevel: number;

  @Column({ type: "enum", enum: SpiritClass, nullable: false })
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    type: String,
    description: "Class of the spirit",
  })
  public class: SpiritClass;

  @Column({ type: "int", nullable: true, default: 1 })
  @Expose()
  @ApiProperty({ type: Number, description: "Level of the spirit" })
  public level: number;

  @ManyToMany(() => Shaman, (shaman) => shaman.guardianSpirits)
  @Expose()
  @ApiProperty({
    type: [Shaman],
    description: "List of shamans associated with the spirit",
  })
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
