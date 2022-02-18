import { Injectable } from '@angular/core';
import { Album } from './album';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  
  public getAlbums(): Observable<Album[]> {
    const url = `${environment.apiUrl}/library/albums`;
    return this.http.get<Album[]>(url).pipe(
      catchError(this.handleError<Album[]>('getAlbums', []))
    );
  }

  public addToFavorites(album: Album): void {
    const url = `${environment.apiUrl}/library/album/favorite/${album.id}`;
    this.http.post(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAlbum'))
    ).subscribe();
  }

  public removeFromFavorites(album: Album): void {
    const url = `${environment.apiUrl}/library/album/favorite/${album.id}`;
    this.http.delete(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAlbum'))
    ).subscribe();
  }

  public addTag(albums: Album[]): void {
    // TODO
    
  }
  
  public addAlbum(album: Album): void {
    const url = `${environment.apiUrl}/library/album`;
    console.log(url)
    this.http.post<Album>(url, album, this.httpOptions).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleError<Album>('addAlbum'))
    ).subscribe();
  }

  public deleteAlbum(id: string): void {
    const url = `${environment.apiUrl}/library/album/${id}`;
    console.log(url) // TODO
    this.http.delete<Album>(url, this.httpOptions).pipe(
      catchError(this.handleError<Album>('deleteAlbum'))
    ).subscribe();
  }

  /* GET albums whose title contains search term */
  searchAlbums(term: string): Observable<Album[]> {
    if(!term.trim()) {
      // if not search term, return empty album array.
      return of([])
    }
    return this.http.get<Album[]>(`${environment.apiUrl}/search/?album=${term}`).pipe(
      catchError(this.handleError<Album[]>('searchAlbums', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
