import { CatService } from '../shared/catService';
import { RoomScene } from './room-scene';
import { Color } from '../shared/enums';

export class MenuScene extends Phaser.Scene {
  catService = new CatService();
  roomScene = new RoomScene();
  inputName;

  constructor() {
    super({
      key: 'MenuScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor('#006d8f');
  }

  preload(): void {
    this.load.image('catLogo', '../../assets/catLogo.png');
    this.load.image('button', '../../assets/gui/button.png');
  }

  create(): void {
    this.cameras.add().setBackgroundColor('#006d8f');

    this.add.text(150, 220, 'onlineCat', {
      fontFamily: 'Indie Flower',
      fontSize: '75px',
      fill: Color.WHITE,
    });

    const buttonSprite = this.add
      .sprite(290, 560, 'button')
      .setDisplaySize(200, 50)
      .setFrame('6')
      .setInteractive();
    buttonSprite.on('pointerdown', () => {
      this.startGame();
    });

    const buttonText = this.add
      .text(buttonSprite.x - 20, buttonSprite.y - 15, 'Start', {
        fontFamily: 'Roboto',
        fontSize: '25px',
        fill: Color.BLUE,
      })
      .setInteractive()
      .on('pointerdown', () => {
        this.startGame();
      });

    this.add.sprite(650, 400, 'catLogo').setScale(0.8);
  }

  startGame() {
      this.scene.start('RoomScene');
    }
}
