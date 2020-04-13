import { LoadingScreen } from '../shared/loading-screen';
import { CatColor, Color, AnimationKey, CatDirection, CatActivity } from '../shared/enums';
import { CatService } from '../shared/catService';
import { AnimationsCreator } from '../shared/animationsCreator';

export class RoomScene extends Phaser.Scene {
  catService = new CatService();
  catColor: CatColor;
  loadingScreen = new LoadingScreen();
  animService = new AnimationsCreator();

  catState = this.catService.loadCatState();
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
    this.load.spritesheet('walkLeft', '../../assets/cat/' + this.catColor + '/walkLeft.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('walkRight', '../../assets/cat/' + this.catColor + '/walkRight.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('runLeft', '../../assets/cat/' + this.catColor + '/runLeft.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('runRight', '../../assets/cat/' + this.catColor + '/runRight.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('idleLeft', '../../assets/cat/' + this.catColor + '/idleLeft.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('idleRight', '../../assets/cat/' + this.catColor + '/idleRight.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('standLeft', '../../assets/cat/' + this.catColor + '/standLeft.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('standRight', '../../assets/cat/' + this.catColor + '/standRight.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
  }

  create() {
    console.log('%cCAT STATE: ', 'color: orange;', this.catState);

    this.add.image(450, 350, 'room').setScale(0.7);

    let floor = this.physics.add.staticGroup();
    floor.create(450, 622, 'floor').setScale(2).refreshBody();

    this.animService.createCatAnimations(this);
    this.ball = this.physics.add.sprite(850, 420, 'tennisball');
    this.cat = this.physics.add.sprite(250, 500, 'standLeft');

    this.ball
      .setVelocity(-300, 300)
      .setBounce(0.5)
      .setDrag(5)
      .setCollideWorldBounds(true)
      .setScale(0.04)
      .setMass(3);

    this.cat
      .setBounce(0.2)
      .setMass(120)
      .setCollideWorldBounds(true)

      .setScale(0.14, 0.14)
      .setDrag(15)
      .play(this.animService.generateKey());

    this.physics.add.collider(this.cat, [this.ball, floor]);
    this.physics.add.collider(this.ball, floor);
    this.physics.add.collider(this.ball, this.cat, () => this.catAttitude())

  //  this.physics.add.overlap(this.cat, this.ball, () => this.catAttitude());


  }

  update() {



    this.ball.rotation += this.ball.body.velocity.x / 1300;
  }

  catAttitude() {

    this.cat.destroy();



    setInterval(() => {
      console.log('%cCAT STATE: ', 'color: orange;', this.catState);
    }, 10000)
  }
}
