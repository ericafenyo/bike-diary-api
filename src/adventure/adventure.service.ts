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
  ) { }

  async find(): Promise<Adventure[]> {
    return await this.adventureModel.find();
  }

  async findById(id: string): Promise<Adventure> {
    return await this.adventureModel.findOne({ id });
  }

  async addAdventures(id: string, inputs: AdventureInput[]): Promise<Adventure[]> {
    const user = await this.userService.findById(id);
    const documents = inputs.map(input => {
      return { ...input }
    });

    return await this.adventureModel.create(documents)
  }
}
