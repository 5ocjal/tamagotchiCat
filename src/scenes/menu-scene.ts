import { CatService } from '../catService';
import { RoomScene } from './room-scene';

export class MenuScene extends Phaser.Scene {
  catService = new CatService();
  roomScene = new RoomScene();

  constructor() {
    super({
      key: 'MenuScene',
    });
  }

  preload(): void {
    this.load.image('catLogo', '../../assets/catLogo.png');
    this.load.image('buttonUp', '../../assets/gui/longBtn.png');
    this.load.image('buttonDown', '../../assets/gui/longBtnDown.png');
    this.load.spritesheet('buttons', '../../assets/gui/buttons.png', { frameWidth: 435, frameHeight: 200 });
  }

  create(): void {
    this.cameras.add().setBackgroundColor('#006d8f');

    this.add.text(150, 220, 'onlineCat', {
      fontFamily: 'Indie Flower',
      fontSize: '75px',
      fill: '#E2FCEF',
    });
    this.add.text(210, 420, 'Podaj imię kota:', {
      fontFamily: 'Roboto',
      fontSize: '25px',
      fill: '#ffbf00',
    });

    const buttonSprite = this.add.sprite(290, 560, 'buttons')
    .setDisplaySize(200, 70)
    .setFrame('6')
    .setInteractive();

    buttonSprite.on('pointerdown', () => {
      buttonSprite.setTint(0xebb64d);
      this.startGame();
    });

    const buttonText = this.add
      .text(buttonSprite.x -20, buttonSprite.y -15, 'Start', {
        fontFamily: 'Roboto',
        fontSize: '25px',
        fill: '#006d8f',
      })
      .setShadow(2, 2, '#232323', 3)
      .setInteractive();

    buttonText.on('pointerdown', () => {
      buttonSprite.setTint(0xebb64d);
      this.startGame();
    });


    this.add.sprite(650, 400, 'catLogo').setScale(0.8);


    
  }

  update(): void {}

  startGame() {
    console.log('Name:', this.catService.getCatName());
    this.scene.start('RoomScene')
  }
}
