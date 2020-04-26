export class ControlCenter {
  control;

  constructor(item) {
    this.control = item;
  }

  createContol() {
    this.control.eatIcon.on('pointerdown', () => {
      if (this.control.bowl === undefined || this.control.bowl.active === false) {
        this.control.bowl = this.control.physics.add.sprite(350, -20, 'eatIcon').setScale(0.12);
        this.control.physics.add.collider(this.control.bowl, this.control.floor);
        this.control.physics.add.overlap(this.control.cat, this.control.bowl, () => {
          this.control.catState.hunger += 40;
          this.control.bowl.destroy();
        });
      }
    });
    this.control.waterIcon.on('pointerdown', () => {
      console.log(this.control.drink);
      if (this.control.drink === undefined || this.control.drink.active === false) {
        this.control.drink = this.control.physics.add.sprite(550, -20, 'waterBowl').setScale(0.1);
        this.control.physics.add.collider(this.control.drink, this.control.floor);
        this.control.physics.add.overlap(this.control.cat, this.control.drink, () => {
          this.control.catState.thirst += 60;
          this.control.drink.destroy();
        });
      }
    });
    this.control.balloonIcon.on('pointerdown', () => console.log('balloon'));
    this.control.bubbleIcon.on('pointerdown', () => console.log('bubble'));
    this.control.cleanIcon.on('pointerdown', () => {
      if (this.control.shit !== undefined && this.control.shit.active) {
        console.log('oh shit');
        this.control.cleanShit();
      }
    });
    this.control.doorIcon.on('pointerdown', () => console.log('door'));
  }
}
