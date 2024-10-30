import { Injectable } from "@nestjs/common";
import { DataSource, In, Repository, type EntityManager } from "typeorm";
import { Duel } from "../models/entities/duel.entity";
import { Shaman } from "@modules/shaman/models/entities";
import { CreateDuelDto } from "../models/dto";
import type { IDuelResult } from "../models/interfaces";

@Injectable()
export class DuelRepository extends Repository<Duel> {
  public constructor(private readonly _dataSource: DataSource) {
    super(Duel, _dataSource.createEntityManager());
  }

  private calculateShamansPower(shamans: Shaman[]): { name: string; power: number }[] {
    return shamans.map((shaman) => {
      const { name, furyokuLevel, guardianSpirits } = shaman;

      const spiritsFuryokuLevel = guardianSpirits.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.furyokuLevel;
      }, 0);

      const totalShamanPower = furyokuLevel + spiritsFuryokuLevel;

      return { name, power: totalShamanPower };
    });
  }

  private calculateDuelResult(shamans: { name: string; power: number }[]): IDuelResult {
    const [shaman1, shaman2] = shamans;

    if (shaman1.power === shaman2.power) return { draw: "draw" };
    return shaman1.power > shaman2.power
      ? { winner: shaman1.name, loser: shaman2.name }
      : { winner: shaman2.name, loser: shaman1.name };
  }

  public async createDuel(duel: CreateDuelDto): Promise<any> {
    return await this._dataSource.transaction(async (entityManager: EntityManager) => {
      const { fighters } = duel;

      const existingFighters = await Promise.all(
        fighters.map(async (fighter) => {
          const foundFighter = await entityManager.findOne(Shaman, {
            where: { name: fighter },
            relations: ["guardianSpirits"],
          });
          if (!foundFighter) throw new Error(`Fighter ${fighter} not found in the database`);
          return foundFighter;
        }),
      );

      const shamansPower = this.calculateShamansPower(existingFighters);
      const duelResult = this.calculateDuelResult(shamansPower);

      const createdDuel = entityManager.create(Duel, { fighters, result: duelResult });
      return await entityManager.save(Duel, createdDuel);
    });
  }
}
