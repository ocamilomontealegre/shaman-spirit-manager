import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ShamanService } from "../services/shaman.service";
import { Shaman } from "../models/entities";
import { CreateShamanDto, UpdateShamanDto } from "../models/dto";
import { SHAMAN_ENDPOINT } from "../models/constants";

@Controller(SHAMAN_ENDPOINT)
export class ShamanController {
  public constructor(private readonly _shamanService: ShamanService) {}

  @Post()
  public async create(@Body() shaman: CreateShamanDto): Promise<Shaman> {
    return this._shamanService.create(shaman);
  }

  @Get()
  public async findAll(): Promise<Shaman[]> {
    return this._shamanService.findAll();
  }

  @Get(":id")
  public async findOneById(@Param("id") id: string): Promise<Shaman | null> {
    return this._shamanService.findOneById(id);
  }

  @Put(":id")
  public async update(
    @Param("id") id: string,
    @Body() shaman: UpdateShamanDto,
  ): Promise<Shaman | null> {
    return this._shamanService.update(id, shaman);
  }

  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<Shaman | null> {
    return this._shamanService.delete(id);
  }
}
