import { Injectable } from "@nestjs/common";
import { DataSource, In, Repository, type EntityManager } from "typeorm";
import { Duel } from "../models/entities/duel.entity";
import { Shaman } from "@modules/shaman/models/entities";
import { CreateDuelDto } from "../models/dto";

@Injectable()
export class DuelRepository extends Repository<Duel> {
  public constructor(private readonly _dataSource: DataSource) {
    super(Duel, _dataSource.createEntityManager());
  }

  public async createDuel(duel: CreateDuelDto): Promise<any> {
    return await this._dataSource.transaction(async (entityManager: EntityManager) => {
      const fighters = duel.fighters.map(async (fighter) => {
        await entityManager.find(Shaman, { where: { name: fighter } });
      });
      console.log("🚀 ~ DuelRepository ~ fighters ~ fighters:", fighters);
    });
  }
}
