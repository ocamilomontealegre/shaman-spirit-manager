import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { SpiritClass } from "../enums";

export class UpdateSpiritDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public furyokuLevel: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SpiritClass)
  public class: SpiritClass;
}
