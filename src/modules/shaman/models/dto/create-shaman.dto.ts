import { IsArray, IsInt, IsNotEmpty, IsString, Length, Min, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateSpiritDto } from "@modules/spirit/models/dto";

export class CreateShamanDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim)
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  public furyokuLevel: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpiritDto)
  public guardianSpirits: CreateSpiritDto[];
}
