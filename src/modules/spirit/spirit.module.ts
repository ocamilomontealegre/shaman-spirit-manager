import { Module } from "@nestjs/common";
import { SpiritController } from "./controllers/spirit.controller";
import { SpiritService } from "./services/spirit.service";

@Module({
  controllers: [SpiritController],
  providers: [SpiritService],
})
export class SpiritModule {}
