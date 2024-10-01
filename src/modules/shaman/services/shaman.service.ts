import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shaman } from "../models/entities/shaman.entity";
import { CreateShamanDto, UpdateShamanDto } from "../dto";

@Injectable()
export class ShamanService {
  public constructor(
    @InjectRepository(Shaman) private readonly _shamanRepository: Repository<Shaman>,
  ) {}

  public async create(shaman: CreateShamanDto): Promise<Shaman> {
    return this._shamanRepository.save(shaman);
  }

  public async findAll(): Promise<Shaman[]> {
    return this._shamanRepository.find();
  }

  public async findOne(id: string): Promise<Shaman> {
    return this._shamanRepository.findOneBy({ id });
  }

  public async update(id: string, shaman: UpdateShamanDto): Promise<Shaman | null> {
    const result = await this._shamanRepository.update(id, shaman);
    return result ? await this._shamanRepository.findOneBy({ id }) : null;
  }

  public async delete(id: string): Promise<Shaman | null> {
    const result = await this._shamanRepository.softDelete({ id });
    return result ? await this._shamanRepository.findOneBy({ id }) : null;
  }
}
