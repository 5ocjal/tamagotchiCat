import { LoadingScreen } from './../models/loading-screen';
import { CatColor } from './../models/enums';
import { CatService } from '../catService';

export class RoomScene extends Phaser.Scene {
  catService = new CatService();
  catColor: CatColor;
  loadingScreen = new LoadingScreen();

  constructor() {
    super({
      key: 'RoomScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor('#006d8f');
    this.catColor = this.catService.getCatColor();
    console.log('CC: ', this.catColor);
  }

  preload() {
      this.loadingScreen.showLoadingProgress(this);
      this.load.image('room', '../../assets/room/room.jpg');
      this.load.image('floor', '../../assets/room/ground.png');
      this.load.spritesheet('catWalk', '../../assets/cat/' + this.catColor + '/walk.png', { frameWidth: 1082, frameHeight: 811 });
      this.load.spritesheet('catRun', '../../assets/cat/' + this.catColor + '/run.png', { frameWidth: 1082, frameHeight: 811 });
      this.load.spritesheet('catIdle', '../../assets/cat/' + this.catColor + '/idle.png', { frameWidth: 1082, frameHeight: 811 });
      this.load.spritesheet('catStand', '../../assets/cat/' + this.catColor + '/stand.png', { frameWidth: 1082, frameHeight: 811 });
  }

  create() {
    this.add.image(450, 350, 'room').setScale(0.7);

    let floor = this.physics.add.staticGroup();
    floor.create(450, 622, 'floor').setScale(2).refreshBody();

    let cat = this.physics.add.sprite(450, 350, 'catWalk');

    cat.setFrame('1').setScale(0.14).setBounce(0.4).setCollideWorldBounds(true);

    this.physics.add.collider(floor, cat);
  }

  update() {}
}
