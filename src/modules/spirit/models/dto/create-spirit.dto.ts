import { IsEnum, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";
import { SpiritClass } from "../enums";
import { Transform } from "class-transformer";

export class CreateSpiritDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim)
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  public furyokuLevel: number;

  @IsNotEmpty()
  @IsEnum(SpiritClass)
  public class: SpiritClass;
}
