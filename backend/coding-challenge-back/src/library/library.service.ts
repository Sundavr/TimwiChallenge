import { Album } from 'src/album';
import { AlbumInterface } from './interfaces/album.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyLogger } from 'src/myLogger';
import { NewAlbumDto } from './dto/newAlbum.dto';

@Injectable()
export class LibraryService {
    private readonly logger = new MyLogger(LibraryService.name);

    constructor(@InjectModel("Album") private readonly albumModel: Model<AlbumInterface>) {}

    /**
     * Returns all the library albums
     * @returns all the library albums
     */
    public async getAlbums(): Promise<Album[]> {
        this.logger.verbose("getAlbums()");
        const albums = await this.albumModel.find();
        return albums.map(album => Album.fromAlbumInterface(album));
    }

    /**
     * Returns the album matching the given id
     * @param albumId the id of the album
     * @returns the album matching the given id
     * @returns the matched album
     */
    public async getAlbum(albumId: string): Promise<Album> {
        this.logger.verbose("getAlbum(" + albumId + ")");
        const album: AlbumInterface = await this.albumModel.findOne({ id: albumId, });
        if (!album) {
            this.logger.log("Album '" + albumId + "' not found");
            throw new HttpException("No Album with id '" + albumId + "' found", HttpStatus.NOT_FOUND);
        }
        return Album.fromAlbumInterface(album);
    }
    
    /**
     * Add a new album to the library.
     * @param album the album to add
     * @returns the new album
     */
    public async addAlbum(newAlbumDto: NewAlbumDto): Promise<Album> {
        this.logger.verbose("addAlbum(" + newAlbumDto.title + ")");
        
        if (!newAlbumDto || !newAlbumDto.id || !newAlbumDto.title || !newAlbumDto.artists || !Array.isArray(newAlbumDto.artists) || newAlbumDto.artists?.find(artist => !artist.id || !artist.name) || !newAlbumDto.releaseDate) {
            this.logger.log("Incomplete album request received");
            throw new HttpException("You need to specify all the album properties to create a new album ('id', 'title', 'artists {id, name}[]', 'releaseDate')", HttpStatus.BAD_REQUEST);
        }
        const newAlbum = Album.fromNewAlbumDto(newAlbumDto);
        try {
            const album: AlbumInterface = (await (await new this.albumModel(newAlbum)).save()).toObject() as AlbumInterface;
            this.logger.log("New album with id " + album.id);
            return Album.fromAlbumInterface(album);
        } catch (error) {
            this.logger.error("Impossible to add the album '" + newAlbum.title + "': '" + error + "'");
            throw new HttpException("Impossible to add the album '" + newAlbum.title + "', make sure you send correct data, complete error: '" + error + "'", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Remove an album from the library given his ID
     * @param albumId ID of the album to remove
     * @returns the removed album
     */
    public async removeAlbum(albumId: string): Promise<any> {
        this.logger.verbose("removeAlbum(" + albumId + ")");
        const result = await this.albumModel.deleteOne({ id: albumId });
        if (result.deletedCount > 0) {
            this.logger.log("Album '" + albumId + "' removed");
        } else {
            this.logger.log("No album '" + albumId + "' find'");
        }
        return result;
    }

    /**
     * Add the album matching the given ID as favorite
     * @param albumId ID of the album to add as favorite
     * @returns the new favorite album
     */
    public async addFavorite(albumId: string): Promise<Album> {
        this.logger.verbose("addFavorite(" + albumId + ")");
        try {
            const album = await this.albumModel.findOneAndUpdate({
                    id: albumId
                }, { favorite: true }
            );
            if (!album) {
                this.logger.log("No album with ID '" + albumId + "' found'");
                throw new HttpException("Album '" + albumId + "' not found'", HttpStatus.NOT_FOUND);
            }
            this.logger.log("Album '" + albumId + "' added to favorites");
            return Album.fromAlbumInterface(album);
        } catch (error) {
            this.logger.error("Impossible to add album '" + albumId + "' to favorites: '" + error +"'");
            throw new HttpException("Impossible to add your album '" + albumId + "' to favorites: '" + error + "'", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Remove the album matching the given ID from the favorites.
     * @param albumId ID of the album to remove from favorites
     * @returns The unfavorited album
     */
    public async removeFavorite(albumId: string): Promise<Album> {
        this.logger.verbose("removeFavorite(" + albumId + ")");
        try {
            const album = await this.albumModel.findOneAndUpdate({
                    id: albumId
                }, { favorite: false }
            );
            if (!album) {
                this.logger.log("No album with ID '" + albumId + "' found'");
                throw new HttpException("Album '" + albumId + "' not found'", HttpStatus.NOT_FOUND);
            }
            this.logger.log("Album '" + albumId + "' removed from favorites");
            return Album.fromAlbumInterface(album);
        } catch (error) {
            this.logger.error("Impossible to remove album '" + albumId + "' from favorites: '" + error +"'");
            throw new HttpException("Impossible to remove your album '" + albumId + "' from favorites: '" + error + "'", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Add The given tag to the albums matching the given IDs.
     * @param albumIds IDs of the albums to which add this new tag
     * @param tag tag to add to the given albums
     * @returns The number of modified albums
     */
    public async addTag(albumIds: string[], tag: string): Promise<number> {
        this.logger.verbose("addTag([" + albumIds + "], " + tag + ")");
        try {
            const result = await this.albumModel.updateMany({
                    id: { $in : albumIds }
                }, { tag: tag }
            );
            if (!result) {
                this.logger.log("No album(s) with ID include in '" + albumIds + "' found'");
                throw new HttpException("Album(s) '" + albumIds + "' not found'", HttpStatus.NOT_FOUND);
            }
            this.logger.log("Albums '" + albumIds.join(", ") + "' added to favorites");
            
            return result.modifiedCount;
        } catch (error) {
            this.logger.error("Impossible to add tag '" + tag + "' to album(s) '" + albumIds.join(", ") + "': " + error +"'");
            throw new HttpException("Impossible to add tag '" + tag + "' to album(s) '" + albumIds.join(", ") + "': '" + error + "'", HttpStatus.BAD_REQUEST);
        }
    }
}
