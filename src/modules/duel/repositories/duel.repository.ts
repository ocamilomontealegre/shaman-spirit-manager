import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Duel } from "../models/entities/duel.entity";

@Injectable()
export class DuelRepository extends Repository<Duel> {
  public constructor(private readonly _dataSource: DataSource) {
    super(Duel, _dataSource.createEntityManager());
  }
}
