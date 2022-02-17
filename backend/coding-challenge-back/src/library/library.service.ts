import { Injectable } from '@nestjs/common';
import { Album } from 'src/album';

@Injectable()
export class LibraryService {
    // TODO BDD
    private albums: Album[];

    constructor() {
        this.albums = []
    }

    /**
     * Returns all the library albums
     * @returns all the library albums
     */
    getAlbums(): Album[] {
        return this.albums;
    }

    /**
     * Returns the album matching the given id
     * @param albumId the id of the album
     * @returns the album matching the given id
     */
    getAlbum(albumId: string): Album {
        return this.albums.find(album => album.id == albumId);
    }

    /**
     * Add a new album to the library.
     * @param album the album to add
     */
    addAlbum(album: Album): void {
        this.albums.push(album);
    }

    /**
     * Remove an album from the library given his ID
     * @param albumId ID of the album to remove
     */
    removeAlbum(albumId: string): void {
        this.albums = this.albums.filter(album => album.id != albumId);
    }

    /**
     * Add the album matching the given ID as favorite
     * @param albumId ID of the album to add as favorite
     */
    addFavorite(albumId: string): void {
        this.albums.filter(album => album.id == albumId).forEach(album => album.setFavorite(true));
    }

    /**
     * Remove the album matching the given ID from the favorites.
     * @param albumId ID of the album to remove from favorites
     */
    removeFavorite(albumId: string): void {
        this.albums.filter(album => album.id == albumId).forEach(album => album.setFavorite(false));
    }

    /**
     * Add The given tag to the albums matching the given IDs.
     * @param albumIds IDs of the albums to which add this new tag
     * @param tag tag to add to the given albums
     */
    addTag(albumIds: string, tag: string): void {
        this.albums.filter(album => albumIds.includes(album.id)).forEach(album => album.setTag(tag));
    }
}
