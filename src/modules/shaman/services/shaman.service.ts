import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shaman } from "../models/entities/shaman.entity";
import { Spirit } from "@modules/spirit/models/entities";
import { CreateShamanDto, UpdateShamanDto } from "../models/dto";

@Injectable()
export class ShamanService {
  public constructor(
    @InjectRepository(Shaman) private readonly _shamanRepository: Repository<Shaman>,
    @InjectRepository(Spirit) private readonly _spiritRepository: Repository<Spirit>,
  ) {}

  public async create(shamanDto: CreateShamanDto): Promise<Shaman> {
    const spirits = await Promise.all(
      shamanDto.guardianSpirits.map(async (spiritName) => {
        let spirit = await this._shamanRepository.findOne({ where: { name: spiritName } });

        if (!spirit) {
          spirit = this._spiritRepository.create({ name: spiritName });
          spirit = this._spiritRepository.save(spirit);
        }

        return spirit;
      }),
    );
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
