import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { LibraryModule } from './library/library.module';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from "dotenv";

// Environment variables
const result = dotenv.config();

if (result.error) {
  Logger.error(result.error.name, result.error.message);
}

// Database
const DB_HOST : string = process.env.DB_HOST;
const DB_PORT : string = process.env.DB_PORT;
const DB_NAME : string = process.env.DB_NAME;
if (!DB_PORT) {
  Logger.warn("Impossible to read the DB_HOST from .env");
}
if (!DB_PORT) {
  Logger.warn("Impossible to read the DB_PORT from .env");
}
const dbPath = "mongodb://" + (DB_HOST || "localhost") + ":" + (DB_PORT || 27017) + "/" + DB_NAME;
Logger.log("connecting to database '" + dbPath + "'");

@Module({
  imports: [
    MongooseModule.forRoot(dbPath),
    LibraryModule, 
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
