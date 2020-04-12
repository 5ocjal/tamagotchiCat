import { LoadingScreen } from '../shared/loading-screen';
import { CatColor, Color } from '../shared/enums';
import { CatService } from '../shared/catService';
import { AnimationsCreator } from '../shared/animationsCreator';

export class RoomScene extends Phaser.Scene {
  catService = new CatService();
  catColor: CatColor;
  loadingScreen = new LoadingScreen();
  animations = new AnimationsCreator();

  cat;
  ball;

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
    this.load.image('tennisball', '../../assets/items/tennis-ball.png');
    this.load.spritesheet('catWalk', '../../assets/cat/' + this.catColor + '/walkLeft.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catWalk', '../../assets/cat/' + this.catColor + '/walkRight.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catRun', '../../assets/cat/' + this.catColor + '/runLeft.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catRun', '../../assets/cat/' + this.catColor + '/runRight.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catIdle', '../../assets/cat/' + this.catColor + '/idleLeft.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catIdle', '../../assets/cat/' + this.catColor + '/idleRight.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catStand', '../../assets/cat/' + this.catColor + '/standLeft.png', { frameWidth: 1082, frameHeight: 811 });
    this.load.spritesheet('catStand', '../../assets/cat/' + this.catColor + '/standRight.png', { frameWidth: 1082, frameHeight: 811 });
  }

  create() {
    this.add.image(450, 350, 'room').setScale(0.7);

    let floor = this.physics.add.staticGroup();
    floor.create(450, 622, 'floor').setScale(2).refreshBody();

    this.animations.createCatAnimations(this);
    this.ball = this.physics.add.sprite(150, 120, 'tennisball');
    this.cat = this.physics.add.sprite(250, 500, 'catStand');

    this.ball
      .setVelocity(300, 300)
      .setBounce(0.5)
      .setDrag(5)
      .setCollideWorldBounds(true)
      .setScale(0.04)
      .setMass(3);

    this.cat
      .setBounce(0.2)
      .setMass(120)
      .setCollideWorldBounds(true)
      .setSize(600,600)
      .setScale(0.14, 0.14)
      .play('idle');

    this.physics.add.collider(this.cat, [this.ball, floor]);
    this.physics.add.collider(this.ball, [this.cat, floor]);

    this.catAttitude();
  }
  
  update() {

    if(this.ball.velocity){
      this.ball.rotation += this.ball.body.velocity.x / 1300;
    }
  }

  catAttitude() {


  }


}
