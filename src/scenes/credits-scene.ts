import { Color } from '../shared/enums';

export class CreditsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'CreditsScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor('#006d8f');
  }

  preload(): void {
    this.load.image('button', '../../assets/gui/button.png');
  }

  create() {
    const buttonSprite = this.add
      .sprite(760, 630, 'button')
      .setDisplaySize(140, 50)
      .setFrame('6')
      .setInteractive({ useHandCursor: true });
    buttonSprite.on('pointerdown', () => {
      this.backMenu();
    });

    const buttonText = this.add
      .text(buttonSprite.x - 25, buttonSprite.y - 15, 'Okey', {
        fontFamily: 'Roboto',
        fontSize: '25px',
        fill: Color.BLUE,
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.backMenu();
      });

    this.add.text(150, 80, 'Created by r.tupacz', {
      fontFamily: 'Indie Flower',
      fontSize: '55px',
      fill: Color.ORANGE,
    });

    this.add.text(150, 180, 'Credits', {
      fontFamily: 'Indie Flower',
      fontSize: '45px',
      fill: Color.WHITE,
    });

    this.add.text(150, 250, 'Music:', {
      fontFamily: 'Indie Flower',
      fontSize: '30px',
      fill: Color.ORANGE,
    });

    this.add.text(150, 290, 'Dee Yan-Key - "The Sea"', {
      fontSize: '16px',
    });
    this.add.text(150, 305, 'freemusicarchive.org', {
      fontSize: '12px',
    });

    this.add.text(150, 330, 'Icons:', {
      fontFamily: 'Indie Flower',
      fontSize: '30px',
      fill: Color.ORANGE,
    });

    this.add.text(150, 370, 'All icons comes from: www.flaticon.com', {
      fontSize: '16px',
    });

    this.add.text(150, 385, 'flaticon.com/authors/monkik', {
      fontSize: '12px',
    });

    this.add.text(150, 395, 'flaticon.com/authors/freepik', {
      fontSize: '12px',
    });

    this.add.text(150, 405, 'flaticon.com/authors/flat-icons', {
      fontSize: '12px',
    });

    this.add.text(150, 430, 'Rooom background:', {
      fontFamily: 'Indie Flower',
      fontSize: '30px',
      fill: Color.ORANGE,
    });

    this.add.text(150, 470, 'Designed by upklyak', {
      fontSize: '16px',
    });
    this.add.text(150, 485, 'freepik.com', {
      fontSize: '12px',
    });

    this.add.text(150, 510, 'Items asstes:', {
      fontFamily: 'Indie Flower',
      fontSize: '30px',
      fill: Color.ORANGE,
    });

    this.add.text(150, 550, 'gamedeveloperstudio.com', {
      fontSize: '16px',
    });
  }

  backMenu() {
    this.scene.start('MenuScene');
  }
}
