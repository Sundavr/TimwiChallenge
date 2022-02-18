import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Album } from 'src/album';
import { MyLogger } from 'src/myLogger';
import { NewAlbumDto } from './dto/newAlbum.dto';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    private readonly logger = new MyLogger(LibraryController.name);

    constructor(private libraryService : LibraryService) {}

    @Get("albums")
    getAlbums(): Promise<Album[]> {
        this.logger.verbose("getAlbums()");
        return this.libraryService.getAlbums();
    }

    @Get("album/:id")
    getAlbum(@Param("id") id: string): Promise<Album> {
        this.logger.verbose("getAlbum(" + id + ")");
        return this.libraryService.getAlbum(id);
    }

    @Post("album")
    addAlbum(@Body() newAlbum: NewAlbumDto): Promise<Album> {
        this.logger.verbose("addAlbum(" + newAlbum.title + ")");
        return this.libraryService.addAlbum(newAlbum);
    }

    @Delete("album/:id")
    deleteAlbum(@Param("id") id: string): Promise<Album> {
        this.logger.verbose("deleteAlbum(" + id + ")");
        return this.libraryService.removeAlbum(id);
    }

    @Post("album/favorite/:id")
    addFavorite(@Param("id") id: string): Promise<Album> {
        this.logger.verbose("addFavorite(" + id + ")");
        return this.libraryService.addFavorite(id);
    }

    @Delete("album/favorite/:id")
    removeFavorite(@Param("id") id: string): Promise<Album> {
        this.logger.verbose("removeFavorite(" + id + ")");
        return this.libraryService.removeFavorite(id);
    }

    @Put("album")
    addTag(@Query("ids") ids: string, @Query("tag") tag: string): Promise<number> {
        this.logger.verbose("addTag([" + ids.split(",") + "], " + tag + ")");
        return this.libraryService.addTag(ids.split(","), tag);
    }
}
