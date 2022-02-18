import { Album } from "src/album";

export class NewAlbumDto {
    public readonly id: string;
    public readonly title: string;
    public readonly artists: {
        id: string,
        name: string
    }[];
    public readonly releaseDate: string;
    public readonly duration?: number;
    public readonly favorite?: boolean;
    public readonly tag?: string;
}