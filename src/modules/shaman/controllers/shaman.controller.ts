import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ShamanService } from "../services/shaman.service";
import { Shaman } from "../models/entities";
import { SpiritActionDto, CreateShamanDto, UpdateShamanDto } from "../models/dto";
import { Spirit } from "@modules/spirit/models/entities";
import { Endpoints } from "../models/enums";

@ApiTags("Shamans")
@Controller(Endpoints.MAIN)
export class ShamanController {
  public constructor(private readonly _shamanService: ShamanService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: "Create a new shaman record" })
  @ApiBody({ type: CreateShamanDto })
  @ApiResponse({ type: Shaman, status: 200, description: "Shaman data" })
  public async create(@Body() shaman: CreateShamanDto): Promise<Shaman> {
    return this._shamanService.create(shaman);
  }

  @Get()
  @ApiOperation({ summary: "Return all shaman records" })
  @ApiResponse({ type: [Shaman], status: 200, description: "Shaman data" })
  public async findAll(): Promise<Shaman[]> {
    return this._shamanService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Return one shaman by its id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the shaman",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiResponse({ type: Shaman, status: 200, description: "Shaman data" })
  public async findOneById(@Param("id") id: string): Promise<Shaman | null> {
    return this._shamanService.findOneById(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update one shaman by its id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the shaman",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiBody({ type: UpdateShamanDto })
  @ApiResponse({ type: Shaman, status: 200, description: "Shaman data" })
  public async update(
    @Param("id") id: string,
    @Body() shaman: UpdateShamanDto,
  ): Promise<Shaman | null> {
    return this._shamanService.update(id, shaman);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Soft delete shaman record" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the shaman",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiResponse({ type: Shaman, status: 200, description: "Shaman data" })
  public async delete(@Param("id") id: string): Promise<Shaman | null> {
    return this._shamanService.delete(id);
  }

  @Put(`${Endpoints.BIND}/:id`)
  @ApiOperation({ summary: "Bind spirit to shaman" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the shaman",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiBody({
    type: SpiritActionDto,
  })
  @ApiResponse({ status: 200, type: Shaman })
  public async bindSpiritToShaman(
    @Param("id") id: string,
    @Body() { spiritId }: SpiritActionDto,
  ): Promise<Shaman | null> {
    return this._shamanService.bindSpiritToShaman(id, spiritId);
  }

  @Put(`${Endpoints.TRAIN}/:id`)
  @ApiOperation({ summary: "Train bound spirit" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the shaman",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiBody({
    type: SpiritActionDto,
  })
  public async trainSpirit(
    @Param("id") id: string,
    @Body() { spiritId }: SpiritActionDto,
  ): Promise<Spirit | null> {
    return this._shamanService.trainSpirit(id, spiritId);
  }
}
