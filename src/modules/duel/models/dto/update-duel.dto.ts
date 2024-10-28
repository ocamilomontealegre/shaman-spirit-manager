import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";

export class UpdateDuelDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  @ApiProperty({})
  public fighters: string[];
}
