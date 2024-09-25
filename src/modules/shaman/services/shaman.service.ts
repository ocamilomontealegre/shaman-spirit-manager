import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shaman } from "../models/entities/shaman.entity";

@Injectable()
export class ShamanService {
  public constructor(
    @InjectRepository(Shaman) private readonly _shamanRepository: Repository<Shaman>,
  ) {}

  public async findAll(): Promise<Shaman[]> {
    return this._shamanRepository.find();
  }

  public async find(id: number): Promise<Shaman> {
    return this._shamanRepository.findOneBy({ id });
  }
}
