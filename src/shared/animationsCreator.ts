import { CatService } from "./catService";

export class AnimationsCreator {

  catService = new CatService()

  createCatAnimations(game) {
    game.anims.create({
      key: 'stand',
      frames: game.anims.generateFrameNumbers('stand', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'idle',
      frames: game.anims.generateFrameNumbers('idle', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'walk',
      frames: game.anims.generateFrameNumbers('walk', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'run',
      frames: game.anims.generateFrameNumbers('run', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });
  }

}
