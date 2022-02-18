import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './myLogger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  let loggerLevel = process.env.LOGGING_LEVEL;
  
  if (!loggerLevel) {
    loggerLevel = (process.env.NODE_ENV === "development") ? "debug" : "warn";
  }
  try {
      MyLogger.setLevel(loggerLevel);
  } catch (error) {
      Logger.error("Impossible to set the logger level : '" + error + "'");
  }
  let logDirectory : string = process.env.LOGGING_DIRECTORY || "logs/";
  if (!(logDirectory.endsWith("/") || logDirectory.endsWith("\\"))) {
    logDirectory += "/";
  }
  const logFile = logDirectory + new Date().toISOString() + ".log";
  MyLogger.setFile(logFile);
  Logger.log("LOGGING LEVEL : '" + loggerLevel + "', LOGGING FILE : '" + logFile + "'");
  
  const logger = new MyLogger();
  const app = await NestFactory.create(AppModule, {
    logger: logger
  });
  const PORT = process.env.PORT;
  if (!PORT) {
    logger.warn("Impossible to read the PORT from .env");
  }
  app.enableCors();

  // swagger
  const config = new DocumentBuilder()
    .setTitle("Coding challenge")
    .setDescription("Coding challenge backend API documentation")
    .setVersion('1.0')
    .addTag('swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT || 3000);
  logger.log("server running on port " + (PORT || 3000) + " ...");
}
bootstrap();
