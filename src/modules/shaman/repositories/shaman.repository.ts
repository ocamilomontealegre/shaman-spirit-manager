import { Injectable } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import { Shaman } from "../models/entities";
import { Spirit } from "@modules/spirit/models/entities";
import { CreateShamanDto, UpdateShamanDto } from "../models/dto";

@Injectable()
export class ShamanRepository extends Repository<Shaman> {
  public constructor(private readonly _dataSource: DataSource) {
    super(Shaman, _dataSource.createEntityManager());
  }

  public async createShaman(shamanDto: CreateShamanDto): Promise<Shaman> {
    const { guardianSpirits } = shamanDto;
    const guardianSpiritsNames = guardianSpirits.map((guardianSpirit) => guardianSpirit.name);

    return await this._dataSource.transaction(async (entityManager) => {
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

      const shaman = entityManager.create(Shaman, {
        ...shamanDto,
        guardianSpirits: allSpirits,
      });

      return await entityManager.save(Shaman, shaman);
    });
  }

  public async updateShaman(id: string, shamanDto: UpdateShamanDto): Promise<any> {
    const { guardianSpirits, ...shamanData } = shamanDto;

    const guardianSpiritsNames = guardianSpirits.map((guardianSpirit) => guardianSpirit.name);

    return await this._dataSource.transaction(async (entityManager) => {
      // Find existing spirits
      const existingSpirits = await entityManager.find(Spirit, {
        where: { name: In(guardianSpiritsNames) },
      });
      console.log(
        "🚀 ~ ShamanRepository ~ returnawaitthis._dataSource.transaction ~ existingSpirits:",
        existingSpirits,
      );

      await entityManager.update(Shaman, id, shamanData);
      //
    });
  }
}
