import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryController } from './library/library.controller';
import { LibraryService } from './library/library.service';
import { LibraryModule } from './library/library.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [LibraryModule, HttpModule],
  controllers: [AppController, LibraryController],
  providers: [AppService, LibraryService],
})
export class AppModule {}
