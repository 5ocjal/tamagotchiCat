import { Color } from './enums';

export class GuiCreator {
  gui;

  textConfig = {
    fontSize: '22px',
    fontFamily: 'Roboto',
  };

  constructor(item) {
    this.gui = item;
  }

  createGui() {
    this.gui.panel = this.gui.add
      .sprite(-100, 710, 'panel')
      .setOrigin(0, 0.5)
      .setScale(0.22)
      .setDepth(5)
      .setScrollFactor(0);

    this.gui.catIcon = this.gui.add
      .sprite(this.gui.panel.x + 80, this.gui.panel.y - 140, 'catIcon')
      .setOrigin(0, 0)
      .setDepth(6)
      .setScale(0.27)
      .setScrollFactor(0);

    this.gui.dialog = this.gui.add
      .image(this.gui.catIcon.x + 150, this.gui.catIcon.y - 90, 'dialog')
      .setDepth(5)
      .setScale(0.4)
      .setAlpha(0.8)
      .setScrollFactor(0)
      .setVisible(false);

    this.gui.dialogIcon = this.gui.physics.add
      .staticSprite(this.gui.dialog.x - 10, this.gui.dialog.y - 15, 'mouseIcon')
      .setScale(0.08)
      .setDepth(6)
      .setScrollFactor(0)
      .setVisible(false);

    this.gui.iconHolder = this.gui.physics.add.staticGroup();

    for (let i = 1; i < 7; i++) {
      this.gui.iconHolder
        .create(this.gui.panel.x + 275 + 70 * i, this.gui.panel.y - 45, 'action')
        .setDepth(9)
        .setScale(0.1)
        .setScrollFactor(0);
    }

    this.gui.statusBar = this.gui.physics.add
      .staticSprite(450, -20, 'statusBar')
      .setOrigin(0.5, 0)
      .setDisplaySize(1200, 65)
      .setDepth(5)
      .setScrollFactor(0);

    this.gui.eatIcon = this.gui.physics.add
      .staticSprite(this.gui.panel.x + 345, this.gui.panel.y - 50, 'eatIcon')
      .setDepth(10)
      .setScale(0.1)
      .setScrollFactor(0);

    this.gui.waterIcon = this.gui.physics.add
      .staticSprite(this.gui.panel.x + 408, this.gui.panel.y - 60, 'waterIcon')
      .setRotation(12)
      .setDepth(10)
      .setScale(0.1)
      .setScrollFactor(0);

    this.gui.ballonIcon = this.gui.physics.add
      .staticSprite(this.gui.panel.x + 485, this.gui.panel.y - 60, 'ballonIcon')
      .setDepth(10)
      .setScale(0.1)
      .setScrollFactor(0);

    this.gui.bubbleIcon = this.gui.physics.add
      .staticSprite(this.gui.panel.x + 560, this.gui.panel.y - 60, 'bubbleIcon')
      .setDepth(10)
      .setScale(0.1)
      .setScrollFactor(0);

    this.gui.showerIcon = this.gui.physics.add
      .staticSprite(this.gui.panel.x + 625, this.gui.panel.y - 60, 'showerIcon')
      .setDepth(10)
      .setScale(0.1)
      .setScrollFactor(0);

    this.gui.doorIcon = this.gui.physics.add
      .staticSprite(this.gui.panel.x + 695, this.gui.panel.y - 60, 'doorIcon')
      .setDepth(10)
      .setScale(0.1)
      .setScrollFactor(0);

    this.gui.nameBox = this.gui.physics.add
      .staticSprite(925, 690, 'statusBar')
      .setScale(0.4)
      .setScrollFactor(0);

    this.gui.nameTitle = this.gui.add
      .text(this.gui.nameBox.x - 240, this.gui.nameBox.y - 60, this.gui.catState.name, {
        fontFamily: 'Indie Flower',
        fontSize: '65px',
        fill: Color.BLUE,
      })
      .setScrollFactor(0)
      .setOrigin(0, 0);

    this.gui.healthBar = this.gui.physics.add
      .staticSprite(20, 20, 'healthBar')
      .setOrigin(0, 0)
      .setScale(0.12)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.eatBar = this.gui.physics.add
      .staticSprite(240, 20, 'eatBar')
      .setOrigin(0, 0)
      .setScale(0.12)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.waterBar = this.gui.physics.add
      .staticSprite(460, 20, 'waterBar')
      .setOrigin(0, 0)
      .setScale(0.12)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.funBar = this.gui.physics.add
      .staticSprite(680, 20, 'funBar')
      .setOrigin(0, 0)
      .setScale(0.12)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.healthStatusIcon = this.gui.physics.add
      .staticSprite(35, 35, 'healthIcon')
      .setOrigin(0, 0)
      .setScale(0.06)
      .setDepth(14)
      .setScrollFactor(0);

    this.gui.eatStatusIcon = this.gui.physics.add
      .staticSprite(252, 33, 'eatIcon')
      .setOrigin(0, 0)
      .setScale(0.07)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.waterStatusIcon = this.gui.physics.add
      .staticSprite(475, 33, 'waterIcon')
      .setOrigin(0, 0)
      .setScale(0.06)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.funStatusIcon = this.gui.physics.add
      .staticSprite(695, 33, 'funIcon')
      .setOrigin(0, 0)
      .setScale(0.06)
      .setDepth(10)
      .setScrollFactor(0);

    this.gui.healthNo = this.gui.add
      .text(120, 27, '', this.textConfig)
      .setDepth(11)
      .setScrollFactor(0);

    this.gui.eatNo = this.gui.add
      .text(340, 27, '', this.textConfig)
      .setDepth(11)
      .setScrollFactor(0);

    this.gui.waterNo = this.gui.add
      .text(560, 27, '', this.textConfig)
      .setDepth(11)
      .setScrollFactor(0);

    this.gui.funNo = this.gui.add
      .text(790, 27, '', this.textConfig)
      .setDepth(11)
      .setScrollFactor(0);
  }
}
