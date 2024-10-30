import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional } from "class-validator";

export class UpdateDuelDto {
  @IsOptional()
  @IsArray()
  @Type(() => String)
  @ApiProperty({})
  public fighters: string[];
}
