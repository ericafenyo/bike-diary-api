import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class AddUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
