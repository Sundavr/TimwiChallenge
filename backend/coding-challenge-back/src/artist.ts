import { ArtistDto } from "./dto/artist.dto";

export class Artist {
    id: string;
    name: string;
    popularity: number;
    genres: string[];
    followers: number;
    
    constructor(id: string, name: string, popularity: number, genres: string[], followers: number) {
        this.id = id;
        this.name = name;
        this.popularity = popularity;
        this.genres = genres;
        this.followers = followers;
    }
    
    /**
     * Create a new Artist instance given an ArtistDto.
     * @param artist ArtistDto object
     * @returns A new Artist instance
     */
     static fromArtistDto(artist: ArtistDto) {
        return new Artist(
            artist.id,
            artist.name,
            artist.popularity,
            artist.genres,
            artist.followers.total
        );
    }
}