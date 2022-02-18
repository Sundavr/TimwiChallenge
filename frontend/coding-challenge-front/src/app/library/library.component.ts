import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: [ './library.component.css' ]
})
export class LibraryComponent implements OnInit {
  albums: Album[] = [];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    // TODO
  }
}