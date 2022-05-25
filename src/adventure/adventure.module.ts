import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { AdventureResolver } from './adventure.resolver';
import { Adventure, AdventureSchema } from './adventure.schema';
import { AdventureService } from './adventure.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adventure.name, schema: AdventureSchema }]),
    UserModule
  ],
  providers: [AdventureService, AdventureResolver],
})
export class AdventureModule {}
