import { CatService } from "./catService";

export class AnimationsCreator {

  catService = new CatService()

  createCatAnimations(game) {
    game.anims.create({
      key: 'standLeft',
      frames: game.anims.generateFrameNumbers('standLeft', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'idleLeft',
      frames: game.anims.generateFrameNumbers('idleLeft', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'walkLeft',
      frames: game.anims.generateFrameNumbers('walkLeft', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'runLeft',
      frames: game.anims.generateFrameNumbers('runLeft', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'standRight',
      frames: game.anims.generateFrameNumbers('standRight', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'idleRight',
      frames: game.anims.generateFrameNumbers('idleRight', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'walkRight',
      frames: game.anims.generateFrameNumbers('walkRight', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'runRight',
      frames: game.anims.generateFrameNumbers('runRight', { start: 16, end: 0 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });
  }


  generateKey(): string{
    return this.catService.getCatActivity()+this.catService.getCatDirection();
  }
}
