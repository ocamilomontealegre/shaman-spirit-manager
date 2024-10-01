import { Module } from "@nestjs/common";
import { ConfigModule } from "@config/config.module";
import { DatabaseModule } from "@common/database/database.module";
import { HealthModule } from "@health/health.module";
import { ShamanModule } from "@modules/shaman/shaman.module";
import { SpiritModule } from "@modules/spirit/spirit.module";

@Module({
  imports: [
    ConfigModule.register({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    ShamanModule,
    SpiritModule,
  ],
})
export class AppModule {}
