import { ArgsType, ObjectType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class OptArgs {
  @Field()
  email: string;
}

@ObjectType()
export class OptType {
  @Field()
  email: string;
}
