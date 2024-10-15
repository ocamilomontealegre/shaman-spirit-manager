import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";
import { SpiritClass } from "../enums";
import { Transform } from "class-transformer";

export class UpdateSpiritDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim)
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  public furyokuLevel: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SpiritClass)
  public class: SpiritClass;
}
