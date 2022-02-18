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
    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums.sort(album => album.favorite ? -1 : 1);
    });
  }

  deleteAlbum(album: Album): void {
    this.albumService.deleteAlbum(album.id);
    this.albums = this.albums.filter(a => a.id != album.id)
  }

  addFavorite(album: Album): void {
    this.albumService.addToFavorites(album);
    this.albums.filter(a => a.id == album.id).forEach(a => a.favorite = true);
    this.albums.sort(album => album.favorite ? -1 : 1);
  }

  removeFavorite(album: Album): void {
    this.albumService.removeFromFavorites(album);
    this.albums.filter(a => a.id == album.id).forEach(a => a.favorite = false);
    this.albums.sort(album => album.favorite ? -1 : 1);
  }
}