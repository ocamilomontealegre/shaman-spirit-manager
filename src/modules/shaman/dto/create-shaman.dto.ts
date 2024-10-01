import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateShamanDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public furyokuLevel: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  public guardianSpirits: string[];
}
