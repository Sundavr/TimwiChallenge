import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { AlbumSchema } from './schemas/album.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: "Album",
          schema: AlbumSchema,
        }
      ])
    ],
    controllers: [LibraryController],
    providers: [LibraryService]
})
export class LibraryModule {}
