import { Module, type DynamicModule } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { HttpExceptionFilter, TypeOrmExceptionFilter } from "@common/exception-filters";
import { APP_FILTER } from "@nestjs/core";
import { appConfig, nodeConfig, pgConfig } from "@common/env";

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [appConfig, nodeConfig, pgConfig],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class ConfigModule {
  public static register(options: { isGlobal: boolean }): DynamicModule {
    return {
      module: ConfigModule,
      global: options.isGlobal,
    };
  }
}
