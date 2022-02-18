export class AlbumFromIdDto {
    album_type: string;
    artists: {
        external_urls: object[];
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }[];
    available_markets: string[];
    copyrights: {
        text: string;
        type: string;
    }[];
    external_ids: {
        upc: string;
    };
    external_urls: {
        spotify: string;
    };
    genres: string;
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    tracks: {
        href: string;
        items: object[];
        limit: number;
        next: number;
        offset: number;
        previous: number;
        total: number;
    };
    type: string;
    uri: string;
}