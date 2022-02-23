import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Album } from './album';
import { AppService } from './app.service';
import { MyLogger } from './myLogger';

@Controller()
export class AppController {
  private readonly logger = new MyLogger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.verbose("getHello()");
    return this.appService.getHello();
  }

  @Get("album/:id")
  getAlbum(@Param("id") id: string): Observable<Album> {
    this.logger.verbose("getAlbums()");
    return this.appService.getAlbum(id);
  }

  @Get("search")
  search(@Query("album") album: string, @Query("artist") artist: string): Observable<any> {
    this.logger.verbose("findAlbum()");
    if (album) {
      return this.appService.searchAlbum(album);
    } else if (artist) {
      return this.appService.searchArtist(artist);
    } else {
      return Observable.apply(("No parameter found, you need to provide an album or artist name"));
    }
  }

  @Get("artist/:artistId/albums")
  getArtistAlbums(@Param("artistId") artistId: string): Observable<Album[]> {
    this.logger.verbose("getArtistAlbums()");
    return this.appService.getArtistAlbums(artistId);
  }
}
