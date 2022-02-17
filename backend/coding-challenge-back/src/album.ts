import { Artist } from "./artist";
import { ArtistDto } from "./DTO/artist.dto";
import { AlbumDto } from "./DTO/album.dto";
import { ArtistAlbumDto } from "./DTO/artistAlbum.dto";

export class Album {
    id: string;
    title: string;
    artists: {
        id: string;
        name:string;
    }[];
    releaseDate: string;
    duration?: number;
    favorite: boolean;
    tag: string;
    
    constructor(album: AlbumDto | ArtistAlbumDto) {
        this.id = album.id;
        this.title = album.name;
        this.artists = album.artists.map(artist => {
            return {
                id: artist.id,
                name: artist.name
            }
        });
        if ("album" in album) { // AlbumDto
            this.releaseDate = album.album.release_date;
            this.duration = album.duration_ms;
        } else { // ArtistAlbumDto
            this.releaseDate = album.release_date;
        }
        this.favorite = false;
        this.tag = undefined;
    }

    /**
     * Returns whether or not this album is a favorite.
     * @returns whether or not this album is a favorite
     */
    isFavorite() {
        return this.favorite;
    }
    
    /**
     * Returns the album tag
     * @returns the album tag
     */
    getTag() {
        return this.tag;
    }

    /**
     * Defines this album as favorite or unfavorite this album.
     * @param favorite new favorite value for this album
     */
    setFavorite(favorite: boolean) {
        this.favorite = favorite;
    }

    /**
     * Add/update the album tag
     * @param tag the new tag of this album
     */
    setTag(tag: string) {
        this.tag = tag;
    }
}