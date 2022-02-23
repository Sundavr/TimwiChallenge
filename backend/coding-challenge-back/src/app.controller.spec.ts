import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from "dotenv";

const result = dotenv.config();

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("setupEnv", () => {
    it("env error should be undefined", () => {
      expect(result.error).toBe(undefined);
    })
  })

  describe("getHello", () => {
    it('should return welcome message', () => {
      expect(appController.getHello()).toBe('Welcome on the codingChallenge backend service');
    });
  });

  describe("getAlbum", () => {
    it('should return "TRON: Legacy Reconfigured"', () => {
      appController.getAlbum("382ObEPsp2rxGrnsizN5TX").subscribe(album => {
        expect(album.title).toBe("TRON: Legacy Reconfigured");
      });
    });
  });

  describe("search album", () => {
    it("should return an album with ID 382ObEPsp2rxGrnsizN5TX", () => {
      appController.search("TRON: Legacy Reconfigured", undefined).subscribe(albums => {
        expect(albums.some(album => album.id == "382ObEPsp2rxGrnsizN5TX")).toBe(true);
      });
    });
  });

  describe("search artist", () => {
    it("should return an artist with ID 4tZwfgrHOc3mvqYlEYSvVi", () => {
      appController.search(undefined, "Daft Punk").subscribe(artists => {
        expect(artists.some(artist => artist.id == "4tZwfgrHOc3mvqYlEYSvVi")).toBe(true);
      });
    });
  });

  describe("search artist album", () => {
    it("should return an album with ID 382ObEPsp2rxGrnsizN5TX", () => {
      appController.getArtistAlbums("4tZwfgrHOc3mvqYlEYSvVi").subscribe(albums => {
        expect(albums.some(album => album.id == "382ObEPsp2rxGrnsizN5TX")).toBe(true);
      })
    });
  });
});
