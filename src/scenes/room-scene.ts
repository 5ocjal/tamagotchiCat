import { ItemsCreator } from './../shared/itemsCreator';
import { LoadingScreen } from '../shared/loading-screen';
import { Color, CatActivity } from '../shared/enums';
import { CatService } from '../shared/catService';
import { AnimationsCreator } from '../shared/animationsCreator';
import { GuiCreator } from '../shared/guiCreator';

export class RoomScene extends Phaser.Scene {
  catService = new CatService();
  loadingScreen = new LoadingScreen();
  animService = new AnimationsCreator();
  guiCreator = new GuiCreator();
  itemsCreator = new ItemsCreator();

  catState = this.catService.loadCatState();
  roomDay;
  roomNight;
  floor;
  cat;
  mouse;
  ball;
  shit;

  isDay = true;
  dayCycle = 30;

  panel;
  statusBar;
  catIcon;
  dialog;
  dialogIcon;
  iconHolder;
  timerRun = false;
  timer;
  clock = 0;
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
    this.load.image('roomDay', '../../assets/room/roomDayB.jpg');
    this.load.image('roomNight', '../../assets/room/roomNightB.jpg');
    this.load.image('floor', '../../assets/room/ground.png');

    this.load.image('panel', '../../assets/gui/panel.png');
    this.load.image('statusBar', '../../assets/gui/statusBar.png');
    this.load.image(
      'catIcon',
      '../../assets/gui/icons/cat/' + this.catState.color + '/catIcon.png'
    );
    this.load.image('action', '../../assets/gui/iconHolder.png');
    this.load.image('energy', '../assets/gui/icons/energy.png');

    this.load.image('baseball', '../../assets/items/base-ball.png');
    this.load.image('tennisball', '../../assets/items/tennis-ball.png');
    this.load.image('shit', '../../assets/items/shit.png');
    this.load.image('dialog', '../../assets/gui/dialog.png');
    this.load.image('mouseIcon', '../../assets/gui/icons/mouse.png');

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

    this.load.image('sleep', '../../assets/cat/' + this.catState.color + '/sleep.png');

    this.load.spritesheet('mouseRun', '../../assets/mouse/run.png', {
      frameWidth: 1009,
      frameHeight: 748,
    });
  }

  create() {
    this.physics.world.setBounds(-550, 0, 2000, 700);
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      repeat: -1,
    });

    this.roomDay = this.add.image(450, 250, 'roomDay').setDepth(-1).setVisible(true);
    this.roomNight = this.add.image(450, 300, 'roomNight').setDepth(-1).setVisible(false);

    this.timer = this.add.text(50, 40, '', { fontSize: '20px' }).setScrollFactor(0);
    this.add.text(50, 20, 'Time: ', { fontSize: '20px' }).setScrollFactor(0);

    this.floor = this.physics.add.staticGroup();
    this.floor.create(450, 660, 'floor').setSize(2100, 50).setVisible(false);

    this.animService.createCatAnimations(this);
    this.ball = this.physics.add.sprite(850, 420, 'tennisball');
    this.cat = this.physics.add.sprite(350, 570, 'idle');

    this.isDay === false ? this.itemsCreator.createMouse(this) : null;

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
      .setTint()
      .setScale(0.14, 0.14)
      .setDrag(10)
      .play('idle');

    this.guiCreator.createGui(this);

    this.physics.add.collider(this.floor, [this.cat, this.ball, this.shit]);
    this.physics.add.collider(this.cat, [this.ball]);
    this.physics.add.collider(this.ball, [this.cat]);

    this.cameras.main.fadeIn(4000, 0, 109, 143);
    this.cameras.main.startFollow(this.cat).setFollowOffset(0, 230);

    this.catMonitor();
    this.catAttitude();
  }

  update() {
    this.cat.x <= 130 || this.cat.x >= 700
      ? this.cameras.main.stopFollow()
      : this.cameras.main.startFollow(this.cat).setFollowOffset(0, 230);

    this.timerRun ? this.timer.setText(this.clock.toString()) : this.timer.setText('No time');

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
      this.catState.activity = CatActivity.IDLE;
      this.cat.setScale(0.14, 0.14);
      this.cat.setOffset(0, 0);
      this.cat.setVelocity(0);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 1) {
      this.cat.play('stand');
      this.catState.activity = CatActivity.STAND;
      this.cat.setScale(0.14, 0.14);
      this.cat.setOffset(0, 0);
      this.cat.setVelocity(0);
      this.itemsCreator.createShit(this);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 2) {
      this.cat.play('walk');
      this.catState.activity = CatActivity.WALK;
      this.cat.setScale(0.14, 0.14);
      this.cat.setOffset(0, 0);
      this.cat.setVelocityX(-90);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 3) {
      this.cat.play('run');
      this.catState.activity = CatActivity.RUN;
      this.cat.setScale(0.14, 0.14);
      this.cat.setOffset(0, 0);
      this.cat.setVelocity(-200, -30);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 4) {
      this.cat.play('idle');
      this.catState.activity = CatActivity.IDLE;
      this.cat.setScale(-0.14, 0.14);
      this.cat.setOffset(1100, 0);
      this.cat.setVelocity(0);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 5) {
      this.cat.play('stand');
      this.catState.activity = CatActivity.STAND;
      this.cat.setScale(-0.14, 0.14);
      this.cat.setOffset(1100, 0);
      this.cat.setVelocity(0);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 6) {
      this.cat.play('walk');
      this.catState.activity = CatActivity.WALK;
      this.cat.setScale(-0.14, 0.14);
      this.cat.setOffset(1100, 0);
      this.cat.setVelocityX(90);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }

    if (takeAction === 7) {
      this.cat.play('run');
      this.catState.activity = CatActivity.RUN;
      this.cat.setScale(-0.14, 0.14);
      this.cat.setOffset(1100, 0);
      this.cat.setVelocity(200, 30);

      setTimeout(() => {
        this.inAction = false;
        this.catAttitude();
      }, this.getRandom());
    }
  }

  catMonitor() {
    this.timerRun = true;

    setInterval(() => {
      switch (this.catState.activity) {
        case 'walk':
          if (this.catState.energy > 0) {
            this.catState.energy = this.catState.energy - 1;
          }
          break;

        case 'run':
          if (this.catState.energy > 0) {
            this.catState.energy = this.catState.energy - 2;
          }
          break;

        case 'idle':
          if (this.catState.energy < 100) {
            this.catState.energy = this.catState.energy + 3;
          }
          break;

        case 'sleep':
          if (this.catState.energy < 100) {
            this.catState.energy = this.catState.energy + 5;
          }
          break;
      }
    }, 1000);
  }

  getRandom(): number {
    return Phaser.Math.Between(2000, 7000);
  }

  pickAction() {
    if (this.cat.x <= -20) {
      return Phaser.Math.Between(6, 7);
    } else if (this.cat.x >= 1000) {
      return Phaser.Math.Between(2, 3);
    } else {
      return Phaser.Math.Between(0, 7);
    }
  }

  showDialog(info) {
    this.dialog.setVisible(true);

    if (info === 'mouse') {
      this.cat.play('run');
      this.cat.setVelocityY(-100);
      this.dialogIcon.setVisible(true);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 500);
    }
  }

  dayNightChanger() {
    console.log('Day/Night', this.isDay);
    this.isDay = !this.isDay;
    console.log('isDay', this.isDay);

    if (this.isDay) {
      this.mouse.destroy();
      this.dayCycle = 30;
      this.roomDay.setVisible(true);
      this.roomNight.setVisible(false);
      this.cat.setTint();
    } else {
      this.dayCycle = 10;
      this.roomDay.setVisible(false);
      this.roomNight.setVisible(true);
      this.cat.setTint(Color.NIGHTTINT);
      this.itemsCreator.createMouse(this);
    }
  }

  updateTimer() {
    if (this.clock < this.dayCycle) {
      this.clock++;
    } else {
      this.dayNightChanger();
      this.clock = 0;
    }
  }
}
