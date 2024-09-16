import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
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
      }),
    }),
  ],
})
export class DatabaseModule {}
