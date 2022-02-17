import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Album } from 'src/album';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private libraryService : LibraryService) {  }

    @Get("albums")
    getAlbums(): Album[] {
        return this.libraryService.getAlbums();
    }

    @Get("album/:id")
    getAlbum(@Param() params) {
        return this.libraryService.getAlbum(params.id);
    }

    @Post("album")
    addAlbum() {
        // TODO
        this.libraryService.addAlbum(undefined);
    }

    @Delete("album/:id")
    deleteAlbum(@Param() params) {
        this.libraryService.removeAlbum(params.id);
    }

    @Post("album/favorite/:id")
    addFavorite() {
        // TODO
        this.libraryService.addFavorite(undefined);
    }

    @Delete("album/favorite/:id")
    removeFavorite() {
        // TODO
        this.libraryService.removeFavorite(undefined);
    }

    @Put("album/:id")
    addTag(@Param() params) {
        // TODO
        this.libraryService.addTag(params.id, undefined);
    }
}
