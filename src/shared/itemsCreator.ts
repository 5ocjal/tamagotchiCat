import 'phaser';

export class ItemsCreator {
  item;

  constructor(item) {
    this.item = item;
  }

  createMouse() {
    this.item.mouse = this.item.physics.add.sprite(-350, 490, 'mouseRun').setScale(0.1);
    this.item.physics.add.collider(this.item.mouse, this.item.floor);
    this.item.physics.add.overlap(this.item.cat, this.item.mouse, () => {
      this.item.showDialog('mouse');
    });

    this.item.mouse.play('mouseRun').setVelocityX(350);
  }

  createShit(item) {
    if(this.item.shit === undefined){
      this.item.shit = this.item.physics.add
      .sprite(this.item.cat.x + 50, 490, 'shit')
      .setDisplaySize(40, 40)
      .setInteractive()
      .setDepth(0);
      this.item.physics.add.collider(this.item.shit, this.item.floor);
    }
  }

  cleanShit(){
    console.log('sprzatnij')
  }
}
