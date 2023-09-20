import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AdventureService } from "./adventure.service";
import { AuthenticatedUser, CurrentUser } from "../auth/auth.decorator";
import { Adventure, AdventureInput } from "./adventure.types";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";

@Resolver()
export class AdventureResolver {
  constructor(private service: AdventureService) {}

  @Query(() => [Adventure], { name: "adventures" })
  async getAdventures(): Promise<Adventure[]> {
    return await this.service.getAdventures();
  }

  @Query(() => Adventure)
  async adventure(@Args("id") adventureId: string): Promise<Adventure> {
    return await this.service.findById(adventureId);
  }

  @Mutation(() => [Adventure])
  @UseGuards(JwtAuthGuard)
  async createAdventures(
    @CurrentUser() user: AuthenticatedUser,
    @Args({ name: "params", type: () => [AdventureInput] }) inputs: AdventureInput[],
  ): Promise<Adventure[]> {
    return await this.service.createAdventures(user.id, inputs);
  }
}
