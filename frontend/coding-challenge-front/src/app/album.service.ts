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

  // TODO lib
  public getAlbum(id: number): Observable<Album> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.get<Album>(url).pipe(
      catchError(this.handleError<Album>(`getAlbum id=${id}`))
    );
  }

  // TODO lib
  public updateAlbum(album: Album): Observable<any> {
    return this.http.put(environment.apiUrl, album, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAlbum'))
    )
  }

  // TODO
  public addAlbum(album: Album): Observable<Album> {
    console.log("ADD");
    return this.http.post<Album>(environment.apiUrl, album, this.httpOptions).pipe(
      catchError(this.handleError<Album>('addAlbum'))
    );
  }

  // TODO lib
  public deleteAlbum(id: number): Observable<Album> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.delete<Album>(url, this.httpOptions).pipe(
      catchError(this.handleError<Album>('deleteAlbum'))
    );
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
