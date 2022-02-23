import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { Album } from './album';
import { Artist } from './artist';
import { AlbumDto } from './dto/album.dto';
import { ArtistDto } from './dto/artist.dto';
import { ArtistAlbumDto } from './dto/artistAlbum.dto';
import { MyLogger } from './myLogger';

@Injectable()
export class AppService {
  private readonly logger = new MyLogger(AppService.name);
  private token: string;
  private spotifyApi: string;
  
  constructor(private httpService: HttpService) {
    this.token = this.generateToken();
    this.spotifyApi = "https://api.spotify.com/v1/";
  }

  /**
   * Returns the index message
   * @returns the index message
   */
  public getHello(): string {
    this.logger.verbose("getHello()");
    return 'Welcome on the codingChallenge backend service';
  }
  
  /**
   * Returns an album given its ID.
   * @param albumId Album ID
   * @returns An album given its ID.
   */
  public getAlbum(albumId: string): Observable<Album> {
    this.logger.verbose("getAlbum(" + albumId + ")");
    return this.spotifyRequest("albums/" + albumId, response => {
      return Album.fromAlbumDto(response.data as AlbumDto)
    });
  }

  /**
   * Search an album from a given name in the spotify database.
   * @param albumName the name of the album to search
   * @returns An observable containing an array of albums that matched to the given name
   */
  public searchAlbum(albumName: string): Observable<Album[]> {
    this.logger.verbose("searchAlbum(" + albumName + ")");
    return this.spotifyRequest("search/?q=" + albumName + "&type=album", response => {
      let albums: Album[] = response.data.albums.items.map(album => Album.fromAlbumDto(album as AlbumDto));
      this.logger.debug("spotify albums response : " + albums);
      return albums;
    })
  }

  /**
   * Search an artist from a given name in the spotify database.
   * @param artistName the name of the artist to search
   * @returns An observable containing an array of artists that matched to the given name
   */
  public searchArtist(artistName: string): Observable<Artist[]> {
    this.logger.verbose("searchArtist(" + artistName + ")");
    return this.spotifyRequest("search/?q=" + artistName + "&type=artist", response => {
      let artists: Artist[] = response.data.artists.items.map(artist => Artist.fromArtistDto(artist as ArtistDto));
      this.logger.debug("spotify artists response : " + artists);
      return artists;
    });
  }

  /**
   * Given an artist ID, returns 20 albums of this artist.
   * @param artistId ID of this artist
   * @returns 20 albums of this artist
   */
  public getArtistAlbums(artistId: string): Observable<Album[]> {
    this.logger.verbose("getArtistAlbums(" + artistId + ")");
    return this.spotifyRequest("artists/" + artistId + "/albums", response => {
      let artistAlbums: Album[] = response.data.items.map(album => Album.fromArtistAlbumDto(album as ArtistAlbumDto));
      this.logger.debug("spotify artistAlbums response : " + artistAlbums);
      return artistAlbums;
    });
  }

  private generateToken(): string {
    this.logger.debug("generateToken()");
    /*
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { "Authorization": "Basic " + (Buffer.from(process.env.USERNAME + ":" + process.env.PASSWORD).toString("base64")) },
      form: {
        grant_type: "client_credentials"
      },
      json: true
    };
    this.httpService.post("https://accounts.spotify.com/api/token", authOptions)
      .pipe(
          map(response => {
          console.log("response:");
          console.log(response);
          return response;
        }),
        catchError(error => { 
          console.log(error)
          throw new HttpException(error.response.data, error.response.status) }),
    ).subscribe()*/
    return process.env.TOKEN;
  }

  private getHeader() {
    this.logger.debug("getHeader()");
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }
  }

  private spotifyRequest(localUrl: string, callback: Function): Observable<any> {
    this.logger.debug("spotifyRequest(" + localUrl + ", callback)");
    return this.httpService.get(this.spotifyApi + localUrl, { headers: this.getHeader() })
      .pipe(
        map(response => callback(response)),
        catchError(error => { throw new HttpException(error.response.data, error.response.status) })
      );
  }
}
