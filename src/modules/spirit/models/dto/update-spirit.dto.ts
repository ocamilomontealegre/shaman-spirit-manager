import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";
import { SpiritClass } from "../enums";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSpiritDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim)
  @ApiProperty({
    type: String,
    description: "Name of the spirit",
    example: "Bason",
    required: false,
  })
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: "Furyoku level of the spirit",
    example: 3000,
    required: false,
  })
  public furyokuLevel: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SpiritClass)
  @ApiProperty({
    type: String,
    description: "Class of the spirit",
    example: SpiritClass.HUMAN,
    required: false,
  })
  public class: SpiritClass;
}
