import { LoadingScreen } from '../shared/loading-screen';
import { CatColor, Color, CatDirection, CatActivity } from '../shared/enums';
import { CatService } from '../shared/catService';
import { AnimationsCreator } from '../shared/animationsCreator';

export class RoomScene extends Phaser.Scene {
  catService = new CatService();
  loadingScreen = new LoadingScreen();
  animService = new AnimationsCreator();

  catState = this.catService.loadCatState();
  cat;
  ball;
  isDay = true;
  timerRun = false;
  timer;
  inAction = false;
  randomEvent: number;

  energy;

  constructor() {
    super({
      key: 'RoomScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor(Color.BLUE);
  }

  preload() {
    this.loadingScreen.showLoadingProgress(this);
    this.load.image('roomDay', '../../assets/room/roomDay.jpg');
    this.load.image('roomNight', '../../assets/room/roomNight.jpg');
    this.load.image('floor', '../../assets/room/ground.png');
    this.load.image('panel', '../../assets/gui/panel.png');
    this.load.image('energy', '../assets/gui/icons/energy.png');
    this.load.image('baseball', '../../assets/items/base-ball.png');
    this.load.image('tennisball', '../../assets/items/tennis-ball.png');
    this.load.spritesheet('walk', '../../assets/cat/' + this.catState.color + '/walk.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('run', '../../assets/cat/' + this.catState.color + '/run.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('idle', '../../assets/cat/' + this.catState.color + '/idle.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
    this.load.spritesheet('stand', '../../assets/cat/' + this.catState.color + '/stand.png', {
      frameWidth: 1082,
      frameHeight: 811,
    });
  }

  create() {
    console.log('%cCAT STATE: ', 'color: orange;', this.catState);

    this.add.image(450, 350, 'roomNight');
    let panel = this.add
      .image(450, 20, 'panel')
      .setOrigin(0.5, 0)
      .setDisplaySize(600, 200)
      .setAlpha(0.9);

    this.timer = this.add.text(50, 40, '', { fontSize: '20px' });
    this.add.text(50, 20, 'Time: ', { fontSize: '20px' });
    this.add
      .text(panel.x, panel.y + 25, this.catState.name, {
        fontFamily: 'Indie Flower',
        fontSize: '40px',
        fill: Color.RED,
      })
      .setOrigin(0.5, 0);

    this.add.image(panel.x / 2 + 10, panel.y + 100, 'energy').setScale(0.2);
    this.energy = this.add.text(panel.x / 2 + 30, panel.y + 87, '', {
      fontSize: '25px',
      fill: Color.RED,
    });

    let floor = this.physics.add.staticGroup();
    floor.create(450, 680, 'floor').setScale(2).setVisible(false);

    this.animService.createCatAnimations(this);
    this.ball = this.physics.add.sprite(850, 420, 'tennisball');
    this.cat = this.physics.add.sprite(250, 570, 'idle');

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
      .setTint(Color.NIGHTTINT)
      .setScale(0.14, 0.14)
      .setDrag(15)
      .play('idle');

    this.physics.add.collider(this.cat, [this.ball, floor]);
    this.physics.add.collider(this.ball, [this.cat, floor]);

    this.catMonitor();
    this.catAttitude();
  }

  update() {
    this.energy.setText(this.catState.energy.toString());
    this.timerRun
      ? this.timer.setText((this.time.now / 1000).toFixed(2))
      : this.timer.setText('No time');
    this.ball.active === true ? (this.ball.rotation += this.ball.body.velocity.x / 1300) : null;
  }

  catAttitude() {
    this.ball.destroy();
    console.log('Cat is alive');

    let takeAction: number = 0;

    if (this.inAction === false) {
      takeAction = this.pickAction();
    }

    if (takeAction === 0) {
      this.cat.play('idle');
      this.cat.setScale(0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 1) {
      this.cat.play('stand');
      this.cat.setScale(0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 2) {
      this.cat.play('walk');
      this.cat.setScale(0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 3) {
      this.cat.play('run');
      this.cat.setScale(0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 4) {
      this.cat.play('idle');
      this.cat.setScale(-0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 5) {
      this.cat.play('stand');
      this.cat.setScale(-0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 6) {
      this.cat.play('walk');
      this.cat.setScale(-0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 7) {
      this.cat.play('run');
      this.cat.setScale(-0.14, 0.14);
      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }
  }

  catMonitor() {
    this.timerRun = true;

    setInterval(() => {
      this.catState.energy = --this.catState.energy;
      console.log('ENERGY: ', this.catState.energy);
    }, 2000);
  }

  getRandom(): number {
    return Phaser.Math.Between(2000, 7000);
  }

  pickAction() {
    //this.inAction = true;
    return Phaser.Math.Between(0, 7);
  }
}
