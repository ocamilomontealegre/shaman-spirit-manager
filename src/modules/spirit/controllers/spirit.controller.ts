import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SpiritService } from "../services/spirit.service";
import { Spirit } from "../models/entities";
import { SPIRIT_ENDPOINT } from "../models/constants";
import { CreateSpiritDto, UpdateSpiritDto } from "../models/dto";

@Controller(SPIRIT_ENDPOINT)
export class SpiritController {
  public constructor(private readonly _spiritService: SpiritService) {}

  @Post()
  public async create(@Body() spiritDto: CreateSpiritDto): Promise<Spirit> {
    return this._spiritService.create(spiritDto);
  }

  @Get()
  public async findAll(): Promise<Spirit[]> {
    return this._spiritService.findAll();
  }

  @Get(":id")
  public async findOneById(@Param("id") id: string): Promise<Spirit | null> {
    return this._spiritService.findOneById(id);
  }

  @Put(":id")
  public async update(
    @Param("id") id: string,
    @Body() spiritDto: UpdateSpiritDto,
  ): Promise<Spirit | null> {
    return this._spiritService.update(id, spiritDto);
  }

  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<Spirit | null> {
    return this._spiritService.delete(id);
  }
}
