import 'phaser';
export class ItemsCreator {
  item;

  constructor(item) {
    this.item = item;
  }

  createMouse() {
    this.item.mouse = this.item.physics.add.sprite(-350, 490, 'mouseRun').setScale(0.1);
    this.item.physics.add.collider(this.item.mouse, this.item.floor);
    this.item.mouse.play('mouseRun').setVelocityX(350);
  }

  createShit() {
    if (this.item.shit === undefined || this.item.shit.active === false) {
      this.item.needClean = true;
      this.item.shit = this.item.physics.add
        .sprite(this.item.cat.x + 50, 490, 'shit')
        .setDisplaySize(40, 40)
        .setInteractive({ useHandCursor: true })
        .setDepth(0);
      this.item.physics.add.collider(this.item.shit, this.item.floor);
    }
  }
}
