import { ArtistDto } from "./DTO/artist.dto";

export class Artist {
    id: string;
    name: string;
    popularity: number;
    genres: string[];
    followers: number;
    
    constructor(artist: ArtistDto) {
        this.id = artist.id;
        this.name = artist.name;
        this.popularity = artist.popularity;
        this.genres = artist.genres;
        this.followers = artist.followers.total;
    }
}