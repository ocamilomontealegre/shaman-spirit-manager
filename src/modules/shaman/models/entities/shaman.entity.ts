import { IsNotEmpty, IsOptional, Min } from "class-validator";
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
import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Shaman {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({ type: String, description: "Unique identifier for the shaman" })
  public id: string;

  @Column({ type: "varchar", length: 250, unique: true, nullable: false })
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ type: String, description: "Name of the shaman" })
  public name: string;

  @Column({ type: "int", nullable: false })
  @IsNotEmpty()
  @Min(0)
  @Expose()
  @ApiProperty({ type: Number, description: "Furyoku level of the shaman" })
  public furyokuLevel: number;

  @IsOptional()
  @ManyToMany(() => Spirit, (spirit) => spirit.shamans, { cascade: true })
  @JoinTable()
  @Expose()
  @ApiProperty({
    type: [Spirit],
    description: "List of guardian spirits associated with the shaman",
  })
  public guardianSpirits: Spirit[];

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
