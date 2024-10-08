import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
} from "class-validator";
import { UpdateSpiritDto } from "@modules/spirit/models/dto";
import { Type } from "class-transformer";

export class UpdateShamanDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public furyokuLevel: number;
}
