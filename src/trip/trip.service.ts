import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { TripInput } from './trip.resolver';
import { Trip } from './trip.schema';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<Trip>,
    private userService: UserService,
  ) {}

  async find(uid: string): Promise<Trip[]> {
    const user = await this.userService.findById(uid);
    const trips = await this.tripModel.find({ user: user._id });
    return trips;
  }

  async save(uid: string, input: TripInput): Promise<Trip[]> {
    const user = await this.userService.findById(uid);
    const trips = input.documents.map(document =>
      this.buildTrip(document, user._id),
    );
    return await this.tripModel.insertMany(trips);
  }

  private buildTrip(document: string, user: string): Trip {
    return new this.tripModel({ document, user });
  }
}
