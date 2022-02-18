export interface Album {
    title: string;
    id: string;
    artists: {
        id: string;
        name: string;
    }[];
    releaseDate: string;
    favorite: boolean;
    tag: string;
}