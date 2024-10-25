import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DuelService } from "../services/duel.service";
import { Duel } from "../models/entities/duel.entity";

@Controller("duels")
export class DuelController {
  public constructor(private readonly _duelsService: DuelService) {}

  @Post()
  public async create(@Body() duel: any): Promise<any> {
    return this._duelsService.create(duel);
  }

  @Get()
  public async findAll(): Promise<Duel[]> {
    return this._duelsService.findAll();
  }

  @Get(":id")
  public async findOneById(@Param("id") id: string): Promise<Duel | null> {
    return this._duelsService.findOneById(id);
  }

  @Put(":id")
  public async updateOneById(@Param("id") id: string, duel: any): Promise<Duel | null> {
    return this._duelsService.updateOneById(id, duel);
  }

  @Delete(":id")
  public async deleteOneById(@Param("id") id: string): Promise<Duel | null> {
    return this._duelsService.deleteOneById(id);
  }
}
