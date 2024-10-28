import { Injectable } from "@nestjs/common";
import { DuelRepository } from "../repositories/duel.repository";
import { Duel } from "../models/entities/duel.entity";
import { CreateDuelDto, UpdateDuelDto } from "../models/dto";

@Injectable()
export class DuelService {
  public constructor(private readonly _duelsRepository: DuelRepository) {}

  public async create(duel: CreateDuelDto): Promise<any> {
    return this._duelsRepository.createDuel(duel);
  }

  public async findAll(): Promise<Duel[]> {
    return this._duelsRepository.find();
  }

  public async findOneById(id: string): Promise<Duel | null> {
    return this._duelsRepository.findOne({ where: { id } });
  }

  public async updateOneById(id: string, duel: UpdateDuelDto): Promise<Duel | null> {
    const result = this._duelsRepository.update(id, duel);
    return result ? await this.findOneById(id) : null;
  }

  public async deleteOneById(id: string): Promise<Duel | null> {
    const result = this._duelsRepository.softDelete(id);
    return result ? await this.findOneById(id) : null;
  }
}
