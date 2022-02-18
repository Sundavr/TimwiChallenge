import * as mongoose from "mongoose";

export const AlbumSchema = new mongoose.Schema({
    id: { type: String, index : { unique: true } },
    title: String,
    artists: [{
        id: String,
        name: String
    }],
    releaseDate: String,
    duration: Number,
    favorite: Boolean,
    tag: String
});