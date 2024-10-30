import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { DuelService } from "../services/duel.service";
import { Duel } from "../models/entities/duel.entity";
import { CreateDuelDto, UpdateDuelDto } from "../models/dto";
import { DUEL_ENDPOINT } from "../models/constants";

@Controller(DUEL_ENDPOINT)
export class DuelController {
  public constructor(private readonly _duelsService: DuelService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: "Create a new duel record" })
  @ApiBody({ type: CreateDuelDto })
  @ApiResponse({ type: Duel, status: 200, description: "Duel data" })
  public async create(@Body() duel: CreateDuelDto): Promise<any> {
    return this._duelsService.create(duel);
  }

  @Get()
  @ApiOperation({ summary: "Return all duel records" })
  @ApiResponse({ type: [Duel], status: 200, description: "Duel data" })
  public async findAll(): Promise<Duel[]> {
    return this._duelsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Return a duel record by its id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the duel",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiResponse({ type: Duel, status: 200, description: "Duel data" })
  public async findOneById(@Param("id") id: string): Promise<Duel | null> {
    return this._duelsService.findOneById(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a duel record by its id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the duel",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiBody({ type: UpdateDuelDto })
  @ApiResponse({ type: Duel, status: 200, description: "Duel data" })
  public async updateOneById(@Param("id") id: string, duel: UpdateDuelDto): Promise<Duel | null> {
    return this._duelsService.updateOneById(id, duel);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Soft delete a duel record by its id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Unique identifier for the duel",
    example: "864ed83c-ebaa-4fb7-bd0a-f58ef4d01283",
  })
  @ApiResponse({ type: Duel, status: 200, description: "Duel data" })
  public async deleteOneById(@Param("id") id: string): Promise<Duel | null> {
    return this._duelsService.deleteOneById(id);
  }
}
