import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SpiritService } from "../services/spirit.service";
import { Spirit } from "../models/entities";
import { SPIRIT_ENDPOINT } from "../models/constants";
import { CreateSpiritDto, UpdateSpiritDto } from "../models/dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Spirits")
@Controller(SPIRIT_ENDPOINT)
export class SpiritController {
  public constructor(private readonly _spiritService: SpiritService) {}

  @Post()
  @ApiOperation({ summary: "Create a spirit record" })
  @ApiBody({ type: CreateSpiritDto })
  @ApiResponse({ type: Spirit, status: 200, description: "Spirit data" })
  public async create(@Body() spiritDto: CreateSpiritDto): Promise<Spirit> {
    return this._spiritService.create(spiritDto);
  }

  @Get()
  @ApiOperation({ summary: "Return all spirit records" })
  @ApiResponse({ type: [Spirit], status: 200, description: "Spirit data" })
  public async findAll(): Promise<Spirit[]> {
    return this._spiritService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Return a spirit by its id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the spirit",
    example: "eb2fbbc8-6a21-4f45-bca6-a6ed3a4bd21c",
  })
  @ApiResponse({ type: Spirit, status: 200, description: "Spirit data" })
  public async findOneById(@Param("id") id: string): Promise<Spirit | null> {
    return this._spiritService.findOneById(id);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the spirit",
    example: "eb2fbbc8-6a21-4f45-bca6-a6ed3a4bd21c",
  })
  @ApiBody({ type: CreateSpiritDto })
  @ApiOperation({ summary: "Update a spirit record by its id" })
  public async update(
    @Param("id") id: string,
    @Body() spiritDto: UpdateSpiritDto,
  ): Promise<Spirit | null> {
    return this._spiritService.update(id, spiritDto);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the spirit",
    example: "eb2fbbc8-6a21-4f45-bca6-a6ed3a4bd21c",
  })
  @ApiOperation({ summary: "Delete a spirit record by its id" })
  public async delete(@Param("id") id: string): Promise<Spirit | null> {
    return this._spiritService.delete(id);
  }
}
