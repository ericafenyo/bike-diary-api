import { Field, GraphQLTimestamp, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field(() => GraphQLTimestamp)
  time: number;

  @Field()
  speed: number;

  @Field()
  accuracy: number;

  @Field()
  bearing: number;
}

@ObjectType()
export class Trace {
  @Field()
  timezone: string;

  @Field()
  writeTime: Date;

  @Field(() => Location)
  location: Location;
}

@ObjectType()
export class Adventure {
  @Field(() => ID, { name: 'id' })
  _id?: string;

  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  altitude: number;

  @Field(() => Int)
  calories: number;

  @Field()
  distance: number;

  @Field(() => Int)
  duration: number;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  speed: number;

  @Field()
  polyline: string;

  @Field(() => [Trace])
  traces: Trace[];

  @Field()
  image: String;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class LocationInput {
  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field(() => GraphQLTimestamp)
  time: number;

  @Field()
  speed: number;

  @Field()
  accuracy: number;

  @Field()
  bearing: number;
}

@InputType()
export class TraceInput {
  @Field()
  timezone: string;

  @Field()
  writeTime: Date;

  @Field(() => LocationInput)
  location: LocationInput;
}

@InputType()
export class AdventureInput {
  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  altitude: number;

  @Field(() => Int)
  calories: number;

  @Field()
  distance: number;

  @Field(() => Int)
  duration: number;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  speed: number;

  @Field()
  polyline: string;

  @Field()
  image: String;

  @Field(() => [TraceInput])
  traces: TraceInput[];
}
