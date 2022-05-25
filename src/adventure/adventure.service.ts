import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { AdventureInput } from './adventure.resolver';
import { Adventure } from './adventure.schema';

@Injectable()
export class AdventureService {
  constructor(
    @InjectModel(Adventure.name) private tripModel: Model<Adventure>,
    private userService: UserService,
  ) {}

  async find(uid: string): Promise<Adventure[]> {
    const user = await this.userService.findById(uid);
    const trips = await this.tripModel.find({ user: user._id });
    return trips;
  }

  async save(uid: string, input: AdventureInput): Promise<Adventure[]> {
    const user = await this.userService.findById(uid);
    const trips = input.documents.map(document =>
      this.buildTrip(document, user._id),
    );
    return await this.tripModel.insertMany(trips);
  }

  private buildTrip(document: string, user: string): Adventure {
    return new this.tripModel({ document, user });
  }
}
