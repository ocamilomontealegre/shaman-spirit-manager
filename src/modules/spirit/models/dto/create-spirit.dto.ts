import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { SpiritClass } from "../enums";

export class CreateSpiritDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public furyokuLevel: number;

  @IsNotEmpty()
  @IsEnum(SpiritClass)
  public class: SpiritClass;
}
