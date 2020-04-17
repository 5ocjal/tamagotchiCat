export class ItemsCreator {
  createMouse(item) {
    item.mouse = item.physics.add.sprite(-250, 450, 'mouseRun').setScale(0.1);
    item.physics.add.collider(item.mouse, item.floor);
    item.physics.add.overlap(item.cat, item.mouse, () => {
      item.showDialog('mouse');
    });

    item.mouse.play('mouseRun').setVelocityX(350);
  }

  createShit(item) {
    item.shit = item.physics.add
      .sprite(item.cat.x + 40, 600, 'shit')
      .setDisplaySize(40, 40)
      .setDepth(0);
    item.physics.add.collider(item.shit, item.floor);
  }
}
