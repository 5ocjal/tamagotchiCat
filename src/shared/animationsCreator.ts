export class AnimationsCreator {
    
  createCatAnimations(game) {
    game.anims.create({
      key: 'stand',
      frames: game.anims.generateFrameNumbers('catStand', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'idle',
      frames: game.anims.generateFrameNumbers('catIdle', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'walk',
      frames: game.anims.generateFrameNumbers('catWalk', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });

    game.anims.create({
      key: 'run',
      frames: game.anims.generateFrameNumbers('catRun', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true,
    });
  }
}
