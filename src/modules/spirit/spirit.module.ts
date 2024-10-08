import { Module } from "@nestjs/common";
import { SpiritController } from "./controllers/spirit.controller";
import { SpiritService } from "./services/spirit.service";
import { SpiritRepository } from "./repositories/spirit.repository";

@Module({
  controllers: [SpiritController],
  providers: [SpiritService, SpiritRepository],
})
export class SpiritModule {}
