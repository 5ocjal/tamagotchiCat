import { ControlCenter } from './../shared/controlCenter';
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
  guiCreator = new GuiCreator(this);
  itemsCreator = new ItemsCreator(this);
  control = new ControlCenter(this);

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
  nameTitle;
  nameBox;
  catIcon;
  dialog;
  dialogIcon;
  iconHolder;
  bowl;
  drink;
  balloon;
  bubbles;

  healthBar;
  eatBar;
  waterBar;
  funBar;
  healthStatusIcon;
  healthLevel;
  eatStatusIcon;
  eatLevel;
  waterStatusIcon;
  waterLevel;
  funStatusIcon;
  funLevel;
  eatIcon;
  waterIcon;
  balloonIcon;
  bubbleIcon;
  showerIcon;
  doorIcon;
  needClean = false;

  timerRun = false;
  timer;
  clock = 0;
  inAction = false;
  randomEvent: number;

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

    this.load.image('roomDay', '../../assets/room/roomB.jpg');
    this.load.image('roomNight', '../../assets/room/roomNightB.jpg');
    this.load.image('floor', '../../assets/room/ground.png');

    this.load.image('panel', '../../assets/gui/panel.png');
    this.load.image('statusBar', '../../assets/gui/status/statusBar.png');
    this.load.image(
      'catIcon',
      '../../assets/gui/icons/cat/' + this.catState.color + '/catIcon.png'
    );

    this.load.image('mouseIcon', '../../assets/gui/icons/mouse.png');
    this.load.image('action', '../../assets/gui/iconHolder.png');
    this.load.image('healthIcon', '../../assets/gui/icons/heart.png');
    this.load.image('eatIcon', '../../assets/gui/icons/eat.png');
    this.load.image('waterIcon', '../../assets/gui/icons/water.png');
    this.load.image('waterBowl', '../../assets/gui/icons/waterBowl.png');
    this.load.image('funIcon', '../../assets/gui/icons/tennis.png');
    this.load.image('balloonIcon', '../../assets/gui/icons/balloon.png');
    this.load.image('bubbleIcon', '../../assets/gui/icons/bubble.png');
    this.load.image('showerIcon', '../../assets/gui/icons/shower.png');
    this.load.image('doorIcon', '../../assets/gui/icons/door.png');

    this.load.image('healthLevel', '.../../assets/gui/status/healthLevel.png')
    this.load.image('eatLevel', '.../../assets/gui/status/eatLevel.png')
    this.load.image('waterLevel', '.../../assets/gui/status/waterLevel.png')
    this.load.image('funLevel', '.../../assets/gui/status/funLevel.png')
    this.load.image('healthBar', '../../assets/gui/status/health.png');
    this.load.image('eatBar', '../../assets/gui/status/eat.png');
    this.load.image('waterBar', '../../assets/gui/status/water.png');
    this.load.image('funBar', '../../assets/gui/status/fun.png');

    this.load.image('happyEmo', '../../assets/gui/icons/emotions/happy.png');
    this.load.image('sadEmo', '../../assets/gui/icons/emotions/sad.png');

    this.load.image('baseball', '../../assets/items/base-ball.png');
    this.load.image('tennisball', '../../assets/items/tennis-ball.png');
    this.load.image('shit', '../../assets/items/shit.png');
    this.load.image('dialog', '../../assets/gui/dialog.png');

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

    this.roomDay = this.add.image(450, 195, 'roomDay').setDepth(-1).setVisible(true);
    this.roomNight = this.add.image(450, 195, 'roomNight').setDepth(-1).setVisible(false);

    this.floor = this.physics.add.staticGroup();
    this.floor.create(450, 610, 'floor').setSize(2100, 50).setVisible(false);

    this.animService.createCatAnimations(this);
    this.ball = this.physics.add.sprite(850, 420, 'tennisball');
    this.cat = this.physics.add.sprite(350, 470, 'idle');

    this.isDay === false ? this.itemsCreator.createMouse() : null;

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
      .setInteractive()
      .on('pointerover', () => this.showDialog('happy'))
      .play('idle');

    this.guiCreator.createGui();

    this.timer = this.add.text(10, 10, '', { fontSize: '20px' }).setDepth(15).setScrollFactor(0);

    this.physics.add.collider(this.floor, [this.cat, this.ball, this.shit]);
    this.physics.add.collider(this.cat, [this.ball]);
    this.physics.add.collider(this.ball, [this.cat]);

    this.cameras.main.fadeIn(4000, 0, 109, 143);
    this.cameras.main.startFollow(this.cat).setFollowOffset(0, 180);

    this.catMonitor();
    this.levelMonitor();
    this.happinessMonitor();
    this.catAttitude();
    this.control.createContol();
  }

  update() {
    this.cat.x <= 130 || this.cat.x >= 700
      ? this.cameras.main.stopFollow()
      : this.cameras.main.startFollow(this.cat).setFollowOffset(0, 180);

    this.timerRun ? this.timer.setText(this.clock.toString()) : this.timer.setText('No time');

    this.ball.active === true ? (this.ball.rotation += this.ball.body.velocity.x / 1300) : null;
    this.catState.hunger < 20 ? this.showDialog('eat') : null;
    this.catState.thirst < 20 ? this.showDialog('water') : null;
    this.catState.happiness < 20 ? this.showDialog('sad') : null;

    this.catState.energy > 100 ? (this.catState.energy = 100) : null;
    this.catState.hunger > 100 ? (this.catState.hunger = 100) : null;
    this.catState.thirst > 100 ? (this.catState.thirst = 100) : null;
    this.catState.happiness > 100 ? (this.catState.happiness = 100) : null;
    this.catState.energy <= 0 ? (this.catState.energy = 1) : null;
    this.catState.hunger <= 0 ? (this.catState.hunger = 1) : null;
    this.catState.thirst <= 0 ? (this.catState.thirst = 1) : null;
    this.catState.happiness <= 0 ? (this.catState.happiness = 1) : null;

    this.shit !== undefined && this.shit.active ? this.showDialog('shit') : null;

    this.physics.add.overlap(this.cat, this.mouse, () => {
      this.showDialog('mouse');
    });
  }

  catAttitude() {
    this.ball.destroy();

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

    if (takeAction === 3) {
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

    if (takeAction === 4) {
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

    if (takeAction === 5) {
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

  pickAction() {
    if (this.cat.x <= -20) {
      return Phaser.Math.Between(6, 7);
    } else if (this.cat.x >= 1000) {
      return Phaser.Math.Between(4, 5);
    } else {
      if (this.catState.energy > 20) {
        return Phaser.Math.Between(0, 7);
      } else {
        return Phaser.Math.Between(0, 3);
      }
    }
  }

  catMonitor() {
    this.timerRun = true;

    setInterval(() => {
      switch (this.catState.activity) {
        case 'walk':
          this.catState.energy > 0 && this.catState.energy <= 100
            ? (this.catState.energy -= 1)
            : null;
          this.catState.hunger > 0 && this.catState.hunger <= 100
            ? (this.catState.hunger -= 0.5)
            : null;
          this.catState.thirst > 0 && this.catState.thirst <= 100
            ? (this.catState.thirst -= 1.5)
            : null;
          break;

        case 'run':
          this.catState.energy > 0 && this.catState.energy <= 100
            ? (this.catState.energy -= 2)
            : null;
          this.catState.hunger > 0 && this.catState.hunger <= 100
            ? (this.catState.hunger -= 1)
            : null;
          this.catState.thirst > 0 && this.catState.thirst <= 100
            ? (this.catState.thirst -= 2)
            : null;
          this.catState.happiness > 0 && this.catState.happiness < 100
            ? (this.catState.happiness += 0.5)
            : null;
          break;

        case 'idle':
          this.catState.energy > 0 && this.catState.energy <= 100
            ? (this.catState.energy += 3)
            : null;
          this.catState.hunger > 0 && this.catState.hunger <= 100
            ? (this.catState.hunger -= 0.5)
            : null;
          this.catState.thirst > 0 && this.catState.thirst <= 100
            ? (this.catState.thirst -= 1)
            : null;
          this.catState.happiness > 0 && this.catState.happiness < 100
            ? (this.catState.happiness -= 0.5)
            : null;
          break;

        case 'stand':
          this.catState.energy > 0 && this.catState.energy <= 100
            ? (this.catState.energy += 1)
            : null;
          this.catState.hunger > 0 && this.catState.hunger <= 100
            ? (this.catState.hunger -= 0.5)
            : null;
          this.catState.thirst > 0 && this.catState.thirst <= 100
            ? (this.catState.thirst -= 1)
            : null;
          break;

        case 'sleep':
          this.catState.energy > 0 && this.catState.energy <= 100
            ? (this.catState.energy += 5)
            : null;
          this.catState.hunger > 0 && this.catState.hunger <= 100
            ? (this.catState.hunger -= 0.5)
            : null;
          this.catState.thirst > 0 && this.catState.thirst <= 100
            ? (this.catState.thirst -= 0.5)
            : null;
          break;
      }

      if (this.shit !== undefined && this.shit.active) {
        this.catState.happiness -= 7;
      }

      if (this.shit !== undefined && this.shit.active) {
        this.shit.on('pointerover', () => this.cleanShit());
      }
    }, 1000);
  }

  levelMonitor() {
    setInterval(() => {
      this.healthLevel.setCrop(0,0, (this.healthLevel.width * (this.catState.energy / 100)).toFixed(0), 150)
      this.eatLevel.setCrop(0,0, (this.eatLevel.width * (this.catState.hunger / 100)).toFixed(0), 150)
      this.waterLevel.setCrop(0,0, (this.waterLevel.width * (this.catState.thirst / 100)).toFixed(0), 150)
      this.funLevel.setCrop(0,0, (this.funLevel.width * (this.catState.happiness / 100)).toFixed(0), 150)
    }, 1000);
  }

  happinessMonitor() {
    setInterval(() => {
      if (this.catState.scared) {
        this.catState.happiness -= 20;
      }

      if (this.shit !== undefined && this.shit.active) {
        this.catState.happiness -= 3;
      }
    }, 1000);
  }

  getRandom(): number {
    return Phaser.Math.Between(2000, 7000);
  }

  cleanShit() {
    this.shit.destroy();
    if (this.needClean) {
      this.catState.happiness += 40;
    }
    this.needClean = false;
  }

  dayNightChanger() {
    this.isDay = !this.isDay;
    const setMouse = [3, 5, 7];

    if (this.isDay) {
      if (this.mouse !== undefined) {
        this.mouse.destroy();
      }
      this.dayCycle = 30;
      this.roomDay.setVisible(true);
      this.roomNight.setVisible(false);
      this.cat.clearTint();
      if (this.bowl !== undefined && this.bowl.active) {
        this.bowl.clearTint();
      }
      if (this.drink !== undefined && this.drink.active) {
        this.drink.clearTint();
      }
    } else {
      this.dayCycle = 10;
      this.roomDay.setVisible(false);
      this.roomNight.setVisible(true);
      this.cat.setTint(Color.NIGHTTINT);
      if (this.bowl !== undefined && this.bowl.active) {
        this.bowl.setTint(Color.NIGHTTINT);
      }
      if (this.drink !== undefined && this.drink.active) {
        this.drink.setTint(Color.NIGHTTINT);
      }

      if (setMouse.includes(Phaser.Math.Between(1, 10))) {
        this.itemsCreator.createMouse();
      }
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

  showDialog(info) {
    this.dialog.setVisible(true);

    if (info === 'mouse') {
      this.dialogIcon.setTexture('mouseIcon').setVisible(true).setScale(0.08);
      this.cat.play('run');
      this.cat.setVelocityY(-100);
      this.catState.scared = true;

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
        this.catState.scared = false;
      }, 1000);
    }

    if (info === 'shit') {
      if (this.shit.active) {
        this.dialogIcon.setTexture('shit').setVisible(true).setDisplaySize(40, 40);

        setTimeout(() => {
          this.dialogIcon.setVisible(false);
          this.dialog.setVisible(false);
        }, 1000);
      } else {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }
    }

    if (info === 'happy') {
      this.dialogIcon.setTexture('happyEmo').setVisible(true).setScale(0.1);
      this.cat.play('run');
      this.cat.setVelocityY(-100);
      this.catState.happiness += 5;

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 4000);
    }

    if (info === 'sad') {
      this.dialogIcon.setTexture('sadEmo').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 4000);
    }

    if (info === 'eat') {
      this.dialogIcon.setTexture('eatIcon').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 2000);
    }

    if (info === 'water') {
      this.dialogIcon.setTexture('waterIcon').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 2000);
    }
  }
}
