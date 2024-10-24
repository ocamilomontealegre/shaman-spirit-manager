import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SpiritActionDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    description: "ID of the spirit to bind",
    example: "eb2fbbc8-6a21-4f45-bca6-a6ed3a4bd21c",
  })
  public spiritId: string;
}
