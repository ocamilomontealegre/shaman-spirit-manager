import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  public guardianSpirits: string[];
}
