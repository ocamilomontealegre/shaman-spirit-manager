import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { Shaman } from "../models/entities";
import { Spirit } from "@modules/spirit/models/entities";
import { CreateShamanDto } from "../models/dto";

@Injectable()
export class ShamanRepository extends Repository<Shaman> {
  public constructor(private readonly _dataSource: DataSource) {
    super(Shaman, _dataSource.createEntityManager());
  }

  private async findShamanByName(name: string, entityManager: EntityManager): Promise<Shaman> {
    return entityManager.findOne(Shaman, { where: { name }, relations: ["guardianSpirits"] });
  }

  public async createShaman(shamanDto: CreateShamanDto): Promise<Shaman> {
    return await this._dataSource.transaction(async (entityManager: EntityManager) => {
      let shaman: Shaman;

      /* Look if the shaman already exists in the database */
      shaman = await this.findShamanByName(shamanDto.name, entityManager);
      if (shaman) return shaman;

      const { guardianSpirits } = shamanDto;
      const guardianSpiritsNames = guardianSpirits.map((guardianSpirit) => guardianSpirit.name);

      const existingSpirits = await entityManager.find(Spirit, {
        where: { name: In(guardianSpiritsNames) },
      });
      const existingSpiritNames = existingSpirits.map((spirit) => spirit.name);

      const newSpirits = guardianSpirits.filter(
        (spirit) => !existingSpiritNames.includes(spirit.name),
      );

      const createdSpirits = entityManager.create(Spirit, newSpirits);
      await entityManager.save(createdSpirits);

      const allSpirits = await entityManager.find(Spirit, {
        where: { name: In(guardianSpiritsNames) },
      });

      shaman = entityManager.create(Shaman, {
        ...shamanDto,
        guardianSpirits: allSpirits,
      });

      return await entityManager.save(Shaman, shaman);
    });
  }

  // public async bindSpiritToShaman():
}
