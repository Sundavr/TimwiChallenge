import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { Album } from './album';
import { Artist } from './artist';
import { AlbumDto } from './DTO/album.dto';
import { ArtistDto } from './DTO/artist.dto';
import { ArtistAlbumDto } from './DTO/artistAlbum.dto';

@Injectable()
export class AppService {
  private token: string;
  private spotifyApi: string;
  
  constructor(private httpService: HttpService) {
    // TODO
    this.token = this.generateToken();
    this.spotifyApi = "https://api.spotify.com/v1/";
  }

  getHello(): string {
    return 'Welcome on the codingChallenge backend service';
  }

  /**
   * Returns an album given its ID.
   * @param albumId Album ID
   * @returns An album given its ID.
   */
  getAlbum(albumId: string): Observable<Album> {
    return this.spotifyRequest("albums/" + albumId, response => {
      return new Album(response.data as AlbumDto)
    });
  }

  /**
   * Search an album from a given name in the spotify database.
   * @param albumName the name of the album to search
   * @returns An observable containing an array of albums that matched to the given name
   */
  searchAlbum(albumName: string): Observable<Album> {
    return this.spotifyRequest("search/?q=" + albumName + "&type=track", response => {
      console.log(response.data.tracks.items.map(album => {
        console.log(album)
        return new Album(album as AlbumDto);
      }))
      return response.data.tracks.items.map(album => new Album(album));
    })
  }

  /**
   * Search an artist from a given name in the spotify database.
   * @param artistName the name of the artist to search
   * @returns An observable containing an array of artists that matched to the given name
   */
  searchArtist(artistName: string): Observable<Artist> {
    return this.spotifyRequest("search/?q=" + artistName + "&type=artist", response => {
      console.log(response.data.artists.items.map(artist => new Artist(artist)));
      return response.data.artists.items.map(artist => new Artist(artist as ArtistDto));
    });
  }

  /**
   * Given an artist ID, returns 20 albums of this artist.
   * @param artistId ID of this artist
   * @returns 20 albums of this artist
   */
  getArtistAlbums(artistId: string): Observable<Album> {
    return this.spotifyRequest("artists/" + artistId + "/albums", response => {
      return response.data.items.map(album => new Album(album as ArtistAlbumDto))
    });
  }

  private generateToken() {
    // TODO
    return "BQDts_lC5pCA_TELMq335zYeUuSOdIsf4O1awgic5yc-gEbzrJYm4-t9ww0LkNXFxSSC76Sq3FypmoRTcNVJQl25Zy9l1ZADgCJHaXhdynVSA8V5HlBSLVoW8qWQMxtY3JsIKqeIY9Z0Ueh_OfoeQIkHB1-u5tcjriM";
  }

  private getHeader() {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }
  }

  private spotifyRequest(localUrl: string, callback: Function): Observable<any> {
    return this.httpService.get(this.spotifyApi + localUrl, { headers: this.getHeader() })
      .pipe(
        map(response => callback(response)),
        catchError(error => {
          throw new HttpException(error.response.data, error.response.status);
        })
      );
  }
}
