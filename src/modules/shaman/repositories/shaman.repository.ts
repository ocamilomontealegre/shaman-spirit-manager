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

  private async findShamanByName(name: string): Promise<Shaman | null> {
    return this.findOne({ where: { name }, relations: ["guardianSpirits"] });
  }

  private findBindedSpirit(guardianSpirits: Spirit[], spiritId: string): Spirit | null {
    return guardianSpirits.find((spirit) => spirit.id === spiritId);
  }

  public async findShamanById(id: string): Promise<Shaman | null> {
    return this.findOne({ where: { id }, relations: ["guardianSpirits"] });
  }

  public async createShaman(shamanDto: CreateShamanDto): Promise<Shaman> {
    return await this._dataSource.transaction(async (entityManager: EntityManager) => {
      let shaman: Shaman;

      /* Look if the shaman already exists in the database */
      shaman = await this.findShamanByName(shamanDto.name);
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

  public async bindSpiritToShaman(shamanId: string, spiritId: string): Promise<Shaman | null> {
    return await this._dataSource.transaction(async (entityManager: EntityManager) => {
      const spirit = await entityManager.findOneBy(Spirit, { id: spiritId });
      if (!spirit) return null;

      const shaman = await this.findShamanById(shamanId);
      if (!shaman) return null;

      const existingSpirit = this.findBindedSpirit(shaman.guardianSpirits, spiritId);
      if (existingSpirit) return shaman;

      shaman.guardianSpirits.push(spirit);

      return await entityManager.save(Shaman, shaman);
    })
  }

  public async trainSpirit(shamanId: string, spiritId: string): Promise<Spirit | null> {
    return await this._dataSource.transaction(async (entityManager: EntityManager) => {
      const shaman = await this.findShamanById(shamanId);
      if (!shaman) return null;

      const existingSpirit = this.findBindedSpirit(shaman.guardianSpirits, spiritId);
      if (!existingSpirit) return null;

      existingSpirit.level++;
      existingSpirit.furyokuLevel += Number((existingSpirit.furyokuLevel * (Math.random() * 100) / 100).toFixed(0));;

      return await entityManager.save(Spirit, existingSpirit);
    })
  }
}
