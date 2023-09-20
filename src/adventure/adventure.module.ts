import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AdventureResolver } from "./adventure.resolver";

import { AdventureService } from "./adventure.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Adventure } from "./adventure.entity";
import { Location } from "./location.entity";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Adventure, Location])],
  providers: [AdventureService, AdventureResolver],
})
export class AdventureModule {}
