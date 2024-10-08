import { Injectable } from "@nestjs/common";
import { SpiritRepository } from "../repositories/spirit.repository";
import { Spirit } from "../models/entities";
import { CreateSpiritDto, UpdateSpiritDto } from "../models/dto";

@Injectable()
export class SpiritService {
  public constructor(private readonly _spiritRepository: SpiritRepository) {}

  public async create(spiritDto: CreateSpiritDto): Promise<Spirit> {
    const spirit = this._spiritRepository.create(spiritDto);
    return this._spiritRepository.save(spirit);
  }

  public async findAll(): Promise<Spirit[]> {
    return this._spiritRepository.find({ relations: ["shamans"] });
  }

  public async findOneById(id: string): Promise<Spirit | null> {
    return this._spiritRepository.findOne({ where: { id }, relations: ["shamans"] });
  }

  public async update(id: string, spiritDto: UpdateSpiritDto): Promise<Spirit | null> {
    const result = await this._spiritRepository.update(id, spiritDto);
    return result ? await this.findOneById(id) : null;
  }

  public async delete(id: string): Promise<Spirit | null> {
    const result = await this._spiritRepository.softDelete(id);
    return result ? await this.findOneById(id) : null;
  }
}
