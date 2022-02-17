import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("album/:id")
  getAlbums(@Param() params) {
    return this.appService.getAlbum(params.id);
  }

  @Get("artist/:artistId/albums")
  getArtistAlbums(@Param() params) {
    return this.appService.getArtistAlbums(params.artistId);
  }

  @Get("search")
  findAlbum(@Query() query) {
    if (query.album) {
      return this.appService.searchAlbum(query.album);
    } else if (query.artist) {
      return this.appService.searchArtist(query.artist);
    } else {
      return "No parameter found, you need to provide an album or artist name";
    }
  }

  @Get("test")
  test() {
    // return this.appService.getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
    return this.appService.searchAlbum("Doxy");
    // return this.appService.searchArtist("Hiroyuki");
    // return this.appService.getArtistAlbums("0Riv2KnFcLZA3JSVryRg4y")
  }
}
