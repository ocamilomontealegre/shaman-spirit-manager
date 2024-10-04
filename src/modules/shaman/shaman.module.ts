import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShamanController } from "./controllers/shaman.controller";
import { ShamanService } from "./services/shaman.service";
import { ShamanRepository } from "./repositories/shaman.repository";
import { Shaman } from "./models/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Shaman])],
  controllers: [ShamanController],
  providers: [ShamanService, ShamanRepository],
})
export class ShamanModule {}
