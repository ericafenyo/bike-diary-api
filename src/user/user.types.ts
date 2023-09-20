import { InputType, ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNSPECIFIED = "UNSPECIFIED",
}

registerEnumType(Gender, { name: "Gender" });

@ObjectType()
export class UserType {
  @Field(() => ID, { name: "id" })
  uuid: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
