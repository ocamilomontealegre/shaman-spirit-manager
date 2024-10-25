import { Module } from "@nestjs/common";
import { DuelController } from "./controllers/duel.controller";
import { DuelService } from "./services/duel.service";
import { DuelRepository } from "./repositories/duel.repository";

@Module({
  controllers: [DuelController],
  providers: [DuelService, DuelRepository],
})
export class DuelModule {}
