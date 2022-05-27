import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field()
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

  @Field(() => [Location])
  locations: Location[];
}

@ObjectType()
export class Adventure {
  @Field()
  uuid: string;

  @Field()
  calories: number;

  @Field()
  distance: number;

  @Field()
  duration: number;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  speed: number;

  @Field()
  geometry: string;

  @Field(() => [Trace])
  traces: Trace[];

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

  @Field()
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

  @Field(() => [LocationInput])
  locations: LocationInput[];
}

@InputType()
export class AdventureInput {
  @Field()
  uuid: string;

  @Field()
  calories: number;

  @Field()
  distance: number;

  @Field()
  duration: number;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  speed: number;

  @Field()
  geometry: string;

  @Field(() => [TraceInput])
  traces: TraceInput[];
}
