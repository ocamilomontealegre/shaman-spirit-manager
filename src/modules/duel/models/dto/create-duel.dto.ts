import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

export class CreateDuelDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  @ApiProperty({})
  public fighters: string[];
}
