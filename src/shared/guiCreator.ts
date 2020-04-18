export class GuiCreator {

    item;

    constructor(item){
        this.item = item;
    }
    
  createGui() {
    this.item.panel = this.item.add
      .sprite(-100, 710, 'panel')
      .setOrigin(0, 0.5)
      .setScale(0.22)
      .setDepth(5)
      .setAlpha(0.9)
      .setScrollFactor(0);

    this.item.catIcon = this.item.add
      .sprite(this.item.panel.x + 80, this.item.panel.y - 140, 'catIcon')
      .setOrigin(0, 0)
      .setDepth(6)
      .setScale(0.27)
      .setScrollFactor(0);

    this.item.dialog = this.item.add
      .image(this.item.catIcon.x + 150, this.item.catIcon.y - 90, 'dialog')
      .setDepth(5)
      .setScale(0.4)
      .setAlpha(0.8)
      .setScrollFactor(0)
      .setVisible(false);

    this.item.dialogIcon = this.item.physics.add
      .staticSprite(this.item.dialog.x - 10, this.item.dialog.y - 15, 'mouseIcon')
      .setScale(0.08)
      .setDepth(6)
      .setScrollFactor(0)
      .setVisible(false);

    this.item.iconHolder = this.item.physics.add.staticGroup();

    for (let i = 1; i < 7; i++) {
      this.item.iconHolder
        .create(this.item.panel.x + 275 + 70 * i, this.item.panel.y - 45, 'action')
        .setDepth(9)
        .setScale(0.1)
        .setScrollFactor(0);
    }
  }
}
