import { IsArray, IsInt, IsNotEmpty, IsString, Length, Min, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateSpiritDto } from "@modules/spirit/models/dto";
import { ApiProperty } from "@nestjs/swagger";
import { SpiritClass } from "@modules/spirit/models/enums";

export class CreateShamanDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: "Name of the shaman",
    example: "Len Tao",
    required: true,
  })
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: "Level of furyoku of the shaman",
    example: 15000,
    required: true,
  })
  public furyokuLevel: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpiritDto)
  @ApiProperty({
    type: [CreateSpiritDto],
    description: "List of guardian spirits",
    example: [{ name: "Bason", furyokuLevel: 3000, class: SpiritClass.HUMAN }],
    required: false,
  })
  public guardianSpirits?: CreateSpiritDto[];
}
