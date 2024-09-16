import { Module } from "@nestjs/common";
import { ShamanController } from "./controllers/shaman.controller";
import { ShamanService } from "./services/shaman.service";

@Module({
  controllers: [ShamanController],
  providers: [ShamanService],
})
export class ShamanModule {}
