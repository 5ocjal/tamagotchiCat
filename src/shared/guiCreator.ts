export class GuiCreator {
  createGui(item) {
    item.panel = item.add
      .sprite(-100, 710, 'panel')
      .setOrigin(0, 0.5)
      .setScale(0.22)
      .setDepth(5)
      .setAlpha(0.9)
      .setScrollFactor(0);

    item.catIcon = item.add
      .sprite(item.panel.x + 80, item.panel.y - 140, 'catIcon')
      .setOrigin(0, 0)
      .setDepth(6)
      .setScale(0.27)
      .setScrollFactor(0);

    item.dialog = item.add
      .image(item.catIcon.x + 150, item.catIcon.y - 90, 'dialog')
      .setDepth(5)
      .setScale(0.4)
      .setAlpha(0.8)
      .setScrollFactor(0)
      .setVisible(false);

    item.dialogIcon = item.physics.add
      .staticSprite(item.dialog.x - 10, item.dialog.y - 15, 'mouseIcon')
      .setScale(0.08)
      .setDepth(6)
      .setScrollFactor(0)
      .setVisible(false);

    item.iconHolder = item.physics.add.staticGroup();

    for(let i = 1; i < 7; i++){

            item.iconHolder.create(item.panel.x + 275+(70*i), item.panel.y - 45, 'action')
            .setDepth(9)
            .setScale(0.1)
            .setScrollFactor(0);
        
    }
  }
}
