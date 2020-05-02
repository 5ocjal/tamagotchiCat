import { CatService } from './catService';

export class AnimationsCreator {
  catService = new CatService();

  createCatAnimations(scene) {
    scene.anims.create({
      key: 'stand',
      frames: scene.anims.generateFrameNumbers('stand', { start: 1, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('idle', { start: 1, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('walk', { start: 1, end: 16 }),
      frameRate: 20,
      repeat: -1,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('run', { start: 1, end: 16 }),
      frameRate: 40,
      repeat: -1,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'mouseRun',
      frames: scene.anims.generateFrameNumbers('mouseRun', { start: 1, end: 16 }),
      frameRate: 120,
      repeat: -1,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'balloonBoom',
      frames: scene.anims.generateFrameNumbers('balloonBoom', { start: 1, end: 6}),
      frameRate: 40,
      repeat: 0,
      hideOnComplete: true,
    })
  }
}
