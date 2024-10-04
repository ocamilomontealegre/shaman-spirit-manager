import { IsArray, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateSpiritDto } from "@modules/spirit/models/dto";

export class CreateShamanDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public furyokuLevel: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpiritDto)
  public guardianSpirits: CreateSpiritDto[];
}
