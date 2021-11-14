import {
  InputType,
  ObjectType,
  Field,
  ID,
  registerEnumType,
} from '@nestjs/graphql';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNSPECIFIED = 'UNSPECIFIED',
}

registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class UserType {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  uuid: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Gender)
  gender: Gender;
}
