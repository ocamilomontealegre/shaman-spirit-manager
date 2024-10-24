import { IsEnum, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";
import { SpiritClass } from "../enums";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpiritDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: "Name of the spirit",
    example: "Bason",
    required: true,
  })
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: "Furyoku level of the spirit",
    example: 3000,
    required: true,
  })
  public furyokuLevel: number;

  @IsNotEmpty()
  @IsEnum(SpiritClass)
  @ApiProperty({
    type: String,
    description: "Class of the spirit",
    example: SpiritClass.HUMAN,
    required: true,
  })
  public class: SpiritClass;
}
