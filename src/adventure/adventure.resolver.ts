import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdventureService } from './adventure.service';

import { Field, InputType } from '@nestjs/graphql';
import { CurrentUser } from '../auth/auth.decorator';
import { Adventure } from './adventure.schema';

@InputType()
export class AdventureInput {
  @Field(() => [String])
  documents: string[];
}

@Resolver()
export class AdventureResolver {
  constructor(private tripService: AdventureService) {}

  @Query(() => [Adventure])
  async trips(@CurrentUser('uid') uid: string): Promise<Adventure[]> {
    return await this.tripService.find(uid);
  }

  @Mutation(() => [Adventure])
  async addTrips(
    @CurrentUser('uid') uid: string,
    @Args('input') input: AdventureInput,
  ): Promise<Adventure[]> {
    return await this.tripService.save(uid, input);
  }
}
