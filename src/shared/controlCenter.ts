export class ControlCenter {
  control;

  constructor(item) {
    this.control = item;
  }

  createContol() {
    this.control.eatIcon.on('pointerdown', () => {
      console.log('eating');
      this.control.bowl = this.control.physics.add.sprite(350, -20, 'eatIcon').setScale(0.12);
      this.control.physics.add.collider(this.control.bowl, this.control.floor);
      this.control.physics.moveToObject(this.control.cat, this.control.bowl, 150)
      this.control.physics.add.overlap(this.control.cat, this.control.bowl, () => {
        console.log('cat is eating');
      });
    });
    this.control.waterIcon.on('pointerdown', () => {
      console.log('drinking');
      this.control.drink = this.control.physics.add.sprite(550, -20, 'waterBowl').setScale(0.1);
      this.control.physics.add.collider(this.control.drink, this.control.floor);
      this.control.physics.add.overlap(this.control.cat, this.control.drink, () => {
        console.log('cat is drinking');
      });
    });
    this.control.balloonIcon.on('pointerdown', () => console.log('balloon'));
    this.control.bubbleIcon.on('pointerdown', () => console.log('bubble'));
    this.control.showerIcon.on('pointerdown', () => console.log('shower'));
    this.control.doorIcon.on('pointerdown', () => console.log('door'));
  }
}
