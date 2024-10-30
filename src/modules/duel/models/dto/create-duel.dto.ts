import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray } from "class-validator";

export class CreateDuelDto {
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => String)
  @ApiProperty({})
  public fighters: string[];
}
