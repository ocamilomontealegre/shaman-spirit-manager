import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateShamanDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  @Transform(({ value }) => value.trim)
  @ApiProperty({
    type: String,
    description: "Name of the shaman",
    example: "Len Tao",
    required: false,
  })
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, description: "Furyoku level of the shaman", required: false })
  public furyokuLevel: number;
}
