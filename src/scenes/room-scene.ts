import { LoadingScreen } from '../shared/loading-screen';
import { CatColor, Color, CatDirection, CatActivity } from '../shared/enums';
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
  timer;
  randomEvent: number;

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
    this.load.spritesheet('walk', '../../assets/cat/' + this.catColor + '/walk.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('run', '../../assets/cat/' + this.catColor + '/run.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('idle', '../../assets/cat/' + this.catColor + '/idle.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('stand', '../../assets/cat/' + this.catColor + '/stand.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
  }

  create() {
    console.log('%cCAT STATE: ', 'color: orange;', this.catState);

    this.add.image(450, 350, 'room').setScale(0.7);
    this.timer = this.add.text(50, 80, '', {fontSize: '20px'})
    this.add.text(50, 50, 'Game Time: ', {fontSize: '20px'})

    let floor = this.physics.add.staticGroup();
    floor.create(450, 622, 'floor').setScale(2).setVisible(false).refreshBody();

    this.animService.createCatAnimations(this);
    this.ball = this.physics.add.sprite(850, 420, 'tennisball');
    this.cat = this.physics.add.sprite(250, 500, 'idle');

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
      .play('idle');

    this.physics.add.collider(this.cat, [this.ball, floor]);
    this.physics.add.collider(this.ball, [this.cat, floor]);

    this.catAttitude()
  }

  update() {

    this.timer.setText((this.time.now /1000).toFixed(2));

    this.ball.active === true ?  this.ball.rotation += this.ball.body.velocity.x / 1300 : null;
    
  }

  catAttitude() {
    console.log('Cat is alive')
    this.ball.destroy();

    setInterval(() => {

      console.log('TIMER:', this.timer._text)
    }, 5000)


  }

  catMonitor(){

  }

}
