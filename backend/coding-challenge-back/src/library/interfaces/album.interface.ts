import { Document } from "mongoose";

export interface AlbumInterface extends Document {
    readonly id: string;
    readonly title: string;
    readonly artists: {
        id: string,
        name: string
    }[];
    readonly releaseDate: string;
    readonly duration: number;
    favorite: boolean;
    tag: string;
}