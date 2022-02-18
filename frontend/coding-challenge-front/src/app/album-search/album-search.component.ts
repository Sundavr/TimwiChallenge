import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: [ './album-search.component.css' ]
})
export class AlbumSearchComponent implements OnInit {
  albums$!: Observable<Album[]>;
  private searchTerms = new Subject<string>();

  constructor(private albumService: AlbumService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.albums$ = this.searchTerms.pipe(
      // wait 500ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.albumService.searchAlbums(term)),
    );
  }

  addAlbum(album: Album) {
    this.albumService.addAlbum(album);
  }
}