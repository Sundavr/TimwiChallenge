import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("getHello", () => {
    it('should return welcome message', () => {
      expect(appController.getHello()).toBe('Welcome on the codingChallenge backend service');
    });
  });

  describe("getAlbum", () => {
    it('should return "TRON: Legacy Reconfigured"', () => {
      appController.getAlbum("382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc").subscribe(album => {
        expect(album.title).toBe("TRON: Legacy Reconfigured");
      });
    });
  });
});
