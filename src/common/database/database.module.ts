import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shaman } from "@modules/shaman/models/entities";
import { Spirit } from "@modules/spirit/models/entities";
import { Duel } from "@modules/duel/models/entities/duel.entity";
import { pgConfig } from "@common/env";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [pgConfig.KEY],
      useFactory: (_pgConfig: ConfigType<typeof pgConfig>) => ({
        type: "postgres",
        host: _pgConfig.host,
        port: _pgConfig.port,
        username: _pgConfig.username,
        password: _pgConfig.password,
        database: _pgConfig.database,
        entities: [Shaman, Spirit, Duel],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
