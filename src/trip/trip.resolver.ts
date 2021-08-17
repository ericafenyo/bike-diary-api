import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TripService } from './trip.service';

import { Field, InputType } from '@nestjs/graphql';
import { CurrentUser } from '../auth/auth.decorator';
import { Trip } from './trip.schema';

@InputType()
export class TripInput {
  @Field(() => [String])
  documents: string[];
}

@Resolver()
export class TripResolver {
  constructor(private tripService: TripService) {}

  @Query(() => [Trip])
  async trips(@CurrentUser('uid') uid: string): Promise<Trip[]> {
    return await this.tripService.find(uid);
  }

  @Mutation(() => [Trip])
  async addTrips(
    @CurrentUser('uid') uid: string,
    @Args('input') input: TripInput,
  ): Promise<Trip[]> {
    return await this.tripService.save(uid, input);
  }
}
