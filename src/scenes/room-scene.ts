import { LoadingScreen } from '../shared/loading-screen';
import { CatColor, Color } from '../shared/enums';
import { CatService } from '../shared/catService';

export class RoomScene extends Phaser.Scene {
  catService = new CatService();
  catColor: CatColor;
  loadingScreen = new LoadingScreen();

  cat;
  baseball;

  constructor() {
    super({
      key: 'RoomScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor(Color.BLUE);
    this.catColor = this.catService.getCatColor();
  }

  preload() {
    this.loadingScreen.showLoadingProgress(this);
    this.load.image('room', '../../assets/room/room.jpg');
    this.load.image('floor', '../../assets/room/ground.png');
    this.load.image('baseball', '../../assets/items/base-ball.png');
    this.load.spritesheet('catWalk', '../../assets/cat/' + this.catColor + '/walk.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catRun', '../../assets/cat/' + this.catColor + '/run.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catIdle', '../../assets/cat/' + this.catColor + '/idle.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catStand', '../../assets/cat/' + this.catColor + '/stand.png', { frameWidth: 1082, frameHeight: 811 });
  }

  create() {
    this.add.image(450, 350, 'room').setScale(0.7);

    let floor = this.physics.add.staticGroup();
    this.baseball = this.physics.add.sprite(150, 20, 'baseball');
    this.cat = this.physics.add.sprite(450, 350, 'catStand');

    floor.create(450, 622, 'floor').setScale(2).refreshBody();
    this.baseball.setVelocity(200, 200).setBounce(0.7).setCollideWorldBounds(true).setScale(0.04);

    this.cat.setBounce(0.4).setCollideWorldBounds(true).setScale(0.14, 0.14);

    this.physics.add.collider(floor, this.cat);
    this.physics.add.collider(floor, this.baseball);
    this.physics.add.collider(this.cat, this.baseball);

    this.anims.create({
      key: 'standing',
      frames: this.anims.generateFrameNumbers('catStand', {start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: false,
    })

    this.cat.play('standing');
  }

  update() {
    this.baseball.rotation += this.baseball.body.velocity.x / 1300;

  }
}
