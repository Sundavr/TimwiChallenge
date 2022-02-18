import { AlbumDto } from "./dto/album.dto";
import { ArtistAlbumDto } from "./dto/artistAlbum.dto";
import { NewAlbumDto } from "./library/dto/newAlbum.dto";
import { AlbumInterface } from "./library/interfaces/album.interface";

export class AlbumArtist {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class Album {
    id: string;
    title: string;
    artists: AlbumArtist[];
    releaseDate: string;
    duration?: number;
    favorite: boolean;
    tag: string;

    constructor(id: string, title: string, artists: AlbumArtist[], releaseDate: string, duration?: number, favorite?: boolean, tag?: string) {
        this.id = id;
        this.title = title;
        this.artists = artists;
        this.releaseDate = releaseDate;
        this.duration = duration;
        this.favorite = favorite || false;
        this.tag = tag || "";
    }

    /**
     * Create a new Album instance given an AlbumDto.
     * @param album AlbumDto object
     * @param favorite define if the album is labelled as favorite or not (optionnal)
     * @param tag determine a default album tag (optionnal)
     * @returns A new Album instance
     */
    static fromAlbumDto(album: AlbumDto, favorite?: boolean, tag?: string): Album {
        return new Album(
            album.id,
            album.name,
            album.artists.map(artist => new AlbumArtist(artist.id, artist.name)),
            album.release_date,
            undefined, // TODO
            favorite,
            tag
        );
    }
    
    /**
     * Create a new Album instance given an ArtistAlbumDto.
     * @param album ArtistAlbumDto object
     * @param favorite define if the album is labelled as favorite or not (optionnal)
     * @param tag determine a default album tag (optionnal)
     * @returns A new Album instance
     */
    static fromArtistAlbumDto(album: ArtistAlbumDto, favorite?: boolean, tag?: string) {
        return new Album(
            album.id,
            album.name,
            album.artists.map(artist => new AlbumArtist(artist.id, artist.name)),
            album.release_date,
            undefined, // TODO
            favorite,
            tag
        );
    }
    
    /**
     * Create a new Album instance given a NewAlbumDto.
     * @param album NewAlbumDto object
     * @param favorite define if the album is labelled as favorite or not (optionnal)
     * @param tag determine a default album tag (optionnal)
     * @returns A new Album instance
     */
    static fromNewAlbumDto(album: NewAlbumDto, favorite?: boolean, tag?: string) {
        return new Album(
            album.id,
            album.title,
            album.artists.map(artist => new AlbumArtist(artist.id, artist.name)),
            album.releaseDate,
            album.duration,
            favorite,
            tag
        );
    }

    static fromAlbumInterface(album: AlbumInterface) {
        return new Album(
            album.id,
            album.title,
            album.artists.map(artist => new AlbumArtist(artist.id, artist.name)),
            album.releaseDate,
            album.duration,
            album.favorite,
            album.tag
        );
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