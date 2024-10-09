import { Injectable } from "@nestjs/common";
import { ShamanRepository } from "../repositories/shaman.repository";
import { Shaman } from "../models/entities/shaman.entity";
import { Spirit } from "@modules/spirit/models/entities";
import { CreateShamanDto, UpdateShamanDto } from "../models/dto";

@Injectable()
export class ShamanService {
  public constructor(private readonly _shamanRepository: ShamanRepository) { }

  public async create(shamanDto: CreateShamanDto): Promise<Shaman> {
    return this._shamanRepository.createShaman(shamanDto);
  }

  public async findAll(): Promise<Shaman[]> {
    return this._shamanRepository.find({ relations: ["guardianSpirits"] });
  }

  public async findOneById(id: string): Promise<Shaman> {
    return this._shamanRepository.findShamanById(id);
  }

  public async update(id: string, shaman: UpdateShamanDto): Promise<Shaman | null> {
    const result = await this._shamanRepository.update(id, shaman);
    return result ? await this.findOneById(id) : null;
  }

  public async delete(id: string): Promise<Shaman | null> {
    const result = await this._shamanRepository.softDelete({ id });
    return result ? await this.findOneById(id) : null;
  }

  public async bindSpiritToShaman(shamanId: string, spiritId: string): Promise<Shaman | null> {
    return this._shamanRepository.bindSpiritToShaman(shamanId, spiritId);
  }

  public async trainSpirit(shamanId: string, spiritId: string): Promise<Spirit | null> {
    return this._shamanRepository.trainSpirit(shamanId, spiritId);
  }
}
