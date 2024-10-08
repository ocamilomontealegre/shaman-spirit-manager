import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Spirit } from "../models/entities";

@Injectable()
export class SpiritRepository extends Repository<Spirit> {
  public constructor(private readonly _dataSource: DataSource) {
    super(Spirit, _dataSource.createEntityManager());
  }
}
