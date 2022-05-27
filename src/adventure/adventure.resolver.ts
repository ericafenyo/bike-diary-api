import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdventureService } from './adventure.service';
import { AuthenticatedUser, CurrentUser } from '../auth/auth.decorator';
import { Adventure, AdventureInput } from './adventure.types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Resolver()
export class AdventureResolver {
  constructor(private adventureService: AdventureService) {}

  @Query(() => [Adventure])
  async trips(): Promise<Adventure[]> {
    return [];
  }

  @Mutation(() => Adventure)
  @UseGuards(JwtAuthGuard)
  async addAdventure(
    @CurrentUser() user: AuthenticatedUser,
    @Args('param') adventureInput: AdventureInput,
  ): Promise<Adventure> {
    return await this.adventureService.saveAdventure(user.id, adventureInput);
  }
}
