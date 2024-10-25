import { Injectable } from "@nestjs/common";
import { DuelRepository } from "../repositories/duel.repository";
import { Duel } from "../models/entities/duel.entity";

@Injectable()
export class DuelService {
  public constructor(private readonly _duelsRepository: DuelRepository) {}

  public async create(duel: Record<string, unknown>): Promise<Duel> {
    return this._duelsRepository.create(duel);
  }

  public async findAll(): Promise<Duel[]> {
    return this._duelsRepository.find();
  }

  public async findOneById(id: string): Promise<Duel | null> {
    return this._duelsRepository.findOne({ where: { id } });
  }
}
