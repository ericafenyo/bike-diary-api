import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { AdventureInput } from './adventure.types';
import { Adventure } from './adventure.schema';

@Injectable()
export class AdventureService {
  constructor(
    @InjectModel(Adventure.name) private adventureModel: Model<Adventure>,
    private userService: UserService,
  ) {}

  async find(uuid: string): Promise<Adventure[]> {
    const user = await this.userService.findById(uuid);
    const trips = await this.adventureModel.find({ user: user._id });
    return trips;
  }

  async saveAdventure(id: string, input: AdventureInput): Promise<Adventure> {
    const user = await this.userService.findById(id);
    return await new this.adventureModel({ ...input, userId: user._id }).save();
  }
}
