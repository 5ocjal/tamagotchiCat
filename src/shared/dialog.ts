export class Dialog {
  dialog;

  constructor(item) {
    this.dialog = item;
  }

  showDialog(info) {
    this.dialog.dialog.setVisible(true);

    if (info === 'mouse') {
      this.dialog.dialogIcon.setTexture('mouseIcon').setVisible(true).setScale(0.08);
      this.dialog.cat.play('run');
      this.dialog.cat.setVelocityY(-100);
      this.dialog.catState.scared = true;

      setTimeout(() => {
        this.dialog.dialogIcon.setVisible(false);
        this.dialog.dialog.setVisible(false);
      }, 1000);
    }

    if (info === 'shit') {
      if (this.dialog.shit.active) {
        this.dialog.dialogIcon.setTexture('shit').setVisible(true).setDisplaySize(40, 40);

        setTimeout(() => {
          this.dialog.dialogIcon.setVisible(false);
          this.dialog.dialog.setVisible(false);
        }, 1000);
      } else {
        this.dialog.dialogIcon.setVisible(false);
        this.dialog.dialog.setVisible(false);
      }
    }

    if (info === 'happy') {
      this.dialog.dialogIcon.setTexture('happyEmo').setVisible(true).setScale(0.1);
      this.dialog.cat.play('run');
      this.dialog.cat.setVelocityY(-100);
      this.dialog.catState.happiness += 5;

      setTimeout(() => {
        this.dialog.dialogIcon.setVisible(false);
        this.dialog.dialog.setVisible(false);
      }, 2000);
    }

    if (info === 'sad') {
      this.dialog.dialogIcon.setTexture('sadEmo').setVisible(true).setScale(0.1);
      this.dialog.cat.play('run');
      this.dialog.cat.setVelocityY(-100);
      this.dialog.catState.happiness += 5;

      setTimeout(() => {
        this.dialog.dialogIcon.setVisible(false);
        this.dialog.dialog.setVisible(false);
      }, 2000);
    }

    if (info === 'eat') {
      this.dialog.dialogIcon.setTexture('eatIcon').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialog.dialogIcon.setVisible(false);
        this.dialog.dialog.setVisible(false);
      }, 2000);
    }

    if (info === 'water') {
      this.dialog.dialogIcon.setTexture('waterIcon').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialog.dialogIcon.setVisible(false);
        this.dialog.dialog.setVisible(false);
      }, 2000);
    }
  }
}
