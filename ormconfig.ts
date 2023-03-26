import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
require("dotenv").config();

export const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: ["dist/**/*.entity{.ts,.js}"],
  logging: true,
  synchronize: true,
};

const dataSource = new DataSource(options);

export default dataSource;

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return options;
  }
}
