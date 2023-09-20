import {
  Field,
  GraphQLTimestamp,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { BigIntResolver as BigInt } from "graphql-scalars";

export enum DistanceUnit {
  METERS = "METERS",
  KILOMETERS = "KILOMETERS",
  MILES = "MILES",
}

registerEnumType(DistanceUnit, { name: "DistanceUnit" });

@ObjectType()
export class Distance {
  @Field()
  value: number;

  @Field(() => DistanceUnit)
  type: DistanceUnit;
}

@InputType()
export class DistanceInput {
  @Field()
  value: number;

  @Field(() => DistanceUnit)
  type: DistanceUnit;
}

export enum EnergyUnit {
  CALORIES = "CALORIES",
  KILOCALORIES = "KILOCALORIES",
  JOULES = "JOULES",
  KILOJOULES = "KILOJOULES",
}

registerEnumType(EnergyUnit, { name: "EnergyUnit" });

@ObjectType()
export class Energy {
  @Field()
  value: number;

  @Field(() => EnergyUnit)
  type: EnergyUnit;
}

@InputType()
export class EnergyInput {
  @Field()
  value: number;

  @Field(() => EnergyUnit)
  type: EnergyUnit;
}

export enum SpeedUnit {
  METERS_PER_SECOND = "METERS_PER_SECOND",
  KILOMETERS_PER_HOUR = "KILOMETERS_PER_HOUR",
  MILES_PER_HOUR = "MILES_PER_HOUR",
}

registerEnumType(SpeedUnit, { name: "SpeedUnit" });

@ObjectType()
export class Speed {
  @Field()
  value: number;

  @Field(() => SpeedUnit)
  type: SpeedUnit;
}

@InputType()
export class SpeedInput {
  @Field()
  value: number;

  @Field(() => SpeedUnit)
  type: SpeedUnit;
}

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

  @Field(() => Speed)
  speed: Speed;

  @Field()
  accuracy: number;

  @Field()
  bearing: number;
}

@ObjectType()
export class Adventure {
  @Field(() => ID, { name: "id" })
  uuid: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Energy)
  energy: Energy;

  @Field(() => Distance)
  distance: Distance;

  @Field(() => BigInt)
  duration: number;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  speed: Speed;

  @Field()
  polyline: string;

  @Field(() => [Location])
  locations: Location[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class LocationInput {
  @Field()
  writeTime: number;

  @Field()
  timezone: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field(() => GraphQLTimestamp)
  time: number;

  @Field(() => SpeedInput)
  speed: SpeedInput;

  @Field()
  accuracy: number;

  @Field()
  bearing: number;
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

  @Field(() => EnergyInput)
  energy: EnergyInput;

  @Field(() => DistanceInput)
  distance: DistanceInput;

  @Field(() => BigInt)
  duration: number;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field(() => SpeedInput)
  speed: SpeedInput;

  @Field()
  polyline: string;

  @Field()
  image: String;

  @Field(() => [LocationInput])
  locations: LocationInput[];
}
