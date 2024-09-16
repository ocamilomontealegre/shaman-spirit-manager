import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { registerAs } from "@nestjs/config";
import { validateEnv } from "@common/utils";

export class PgEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  public readonly PG_HOST!: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  public readonly PG_PORT!: number;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  public readonly PG_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  public readonly PG_PASSWORD!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  public readonly PG_DATABASE!: string;
}

export interface PgEnvironment {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
}

export default registerAs("pg", (): PgEnvironment => {
  const { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } = validateEnv(
    process.env,
    PgEnvironmentVariables,
  );

  return {
    database: PG_DATABASE,
    host: PG_HOST,
    password: PG_PASSWORD,
    port: PG_PORT,
    username: PG_USERNAME,
  };
});
