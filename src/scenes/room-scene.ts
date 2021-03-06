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
  needToBeLoad = true;
  roomDay;
  roomNight;
  floor;
  cat;
  mouse;
  shit;
  mop;
  trash;
  bowl;
  drink;
  balloon;
  bubbles;

  isDay = true;
  dayCycle = 60;

  panel;
  statusBar;
  nameTitle;
  nameBox;
  catIcon;
  dialog;
  dialogIcon;
  iconHolder;

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
  cleanIcon;
  doorIcon;
  needClean = false;

  timerRun = false;
  timer;
  clock = 0;
  gameTime = {
    min: 0,
    sec: 0,
  };
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
    if (this.needToBeLoad) {
      this.loadingScreen.showLoadingProgress(this);
      this.needToBeLoad = false;
    }

    this.load.image('roomDay', '../../assets/room/room.jpg');
    this.load.image('roomNight', '../../assets/room/roomNight.jpg');
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
    this.load.image('cleanIcon', '../../assets/gui/icons/clean.png');
    this.load.image('doorIcon', '../../assets/gui/icons/door.png');
    this.load.image('nightIcon', '.../../assets/gui/icons/night.png');
    this.load.image('oudoorIcon', '.../../assets/gui/icons/outdoor.png');

    this.load.image('healthLevel', '.../../assets/gui/status/healthLevel.png');
    this.load.image('eatLevel', '.../../assets/gui/status/eatLevel.png');
    this.load.image('waterLevel', '.../../assets/gui/status/waterLevel.png');
    this.load.image('funLevel', '.../../assets/gui/status/funLevel.png');
    this.load.image('healthBar', '../../assets/gui/status/health.png');
    this.load.image('eatBar', '../../assets/gui/status/eat.png');
    this.load.image('waterBar', '../../assets/gui/status/water.png');
    this.load.image('funBar', '../../assets/gui/status/fun.png');

    this.load.image('happyEmo', '../../assets/gui/icons/emotions/happy.png');
    this.load.image('sadEmo', '../../assets/gui/icons/emotions/sad.png');
    this.load.image('sleepEmo', '../../assets/gui/icons/emotions/sleepy.png');
    this.load.image('drinkEmo', '../../assets/gui/icons/emotions/drink.png');
    this.load.image('eMark', '../../assets/gui/icons/exMark.png');

    this.load.image('shit', '../../assets/items/shit.png');
    this.load.image('mop', '../../assets/items/mop.png');
    this.load.image('trash', '../../assets/items/trash.png');
    this.load.image('dialog', '../../assets/gui/dialog.png');

    this.load.spritesheet('balloonBoom', '../../assets/items/balloon.png', {
      frameWidth: 512,
      frameHeight: 512,
    });

    this.load.spritesheet('bubblesBoom', '../../assets/items/bubbles.png', {
      frameWidth: 394,
      frameHeight: 511,
    });

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

    this.load.spritesheet('mouseRun', '../../assets/mouse/run.png', {
      frameWidth: 1009,
      frameHeight: 748,
    });

    this.load.audio('meow', '../../assets/audio/meow.mp3');
    this.load.audio('pop', '../../assets/audio/pop.mp3');
    this.load.audio('theme', '../../assets/audio/theme.mp3');
  }

  create() {
    this.physics.world.setBounds(-550, 0, 2000, 700);
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      repeat: -1,
    });

    this.sound.play('theme', { volume: 0.3 });

    this.roomDay = this.add.image(450, 195, 'roomDay').setDepth(-1).setVisible(true);
    this.roomNight = this.add.image(450, 195, 'roomNight').setDepth(-1).setVisible(false);

    this.floor = this.physics.add.staticGroup();
    this.floor.create(450, 610, 'floor').setSize(2100, 50).setVisible(false);

    this.animService.createCatAnimations(this);
    this.cat = this.physics.add.sprite(350, 470, 'idle');

    this.isDay === false ? this.itemsCreator.createMouse() : null;

    this.cat
      .setBounce(0.2)
      .setMass(120)
      .setCollideWorldBounds(true)
      .setTint()
      .setScale(0.14, 0.14)
      .setDrag(10)
      .setInteractive({ cursor: 'grab' })
      .on('pointerover', () => this.showDialog('happy'))
      .play('idle');

    this.guiCreator.createGui();

    this.timer = this.add
      .text(this.nameBox.x - 195, this.nameBox.y - 20, '', {
        fontSize: '25px',
        fontFamily: 'Indie Flower',
        fill: Color.BLUE,
      })
      .setDepth(15)
      .setScrollFactor(0);

    this.physics.add.collider(this.floor, [this.cat, this.shit]);

    this.cameras.main.fadeIn(4000, 0, 109, 143);
    this.cameras.main.startFollow(this.cat).setFollowOffset(0, 180);

    if (this.cat.active === true) {
      this.catMonitor();
      this.happinessMonitor();
      this.catAttitude();
    }

    this.control.createContol();
  }

  update() {
    this.cat.x <= 130 || this.cat.x >= 700
      ? this.cameras.main.stopFollow()
      : this.cameras.main.startFollow(this.cat).setFollowOffset(0, 180);

    this.timerRun
      ? this.timer.setText(
          this.gameTime.min.toString().padStart(2, '0') +
            ':' +
            this.gameTime.sec.toString().padStart(2, '0')
        )
      : this.timer.setText('No time');

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

    if (this.shit !== undefined && this.shit.active) {
      this.showDialog('shit');
      this.cleanIcon.setAlpha(1);
      this.cleanIcon.setScale(0.1);
      this.cleanIcon.y = this.panel.y - 58;
    } else {
      this.cleanIcon.setAlpha(0.4);
      this.cleanIcon.setScale(0.07);
      this.cleanIcon.y = this.panel.y - 48;
    }

    if (this.balloon !== undefined && this.balloon.children !== undefined) {
      this.balloon.children.iterate((child) => {
        if (child.y <= 100) {
          child.setGravity(0, -300);
          this.physics.add.collider(child, this.floor);
        }
        if (child.x >= 1300) {
          child.play('balloonBoom');

          setTimeout(() => {
            child.destroy();
          }, 1000);
        }
        this.isDay ? child.clearTint() : child.setTint(Color.NIGHTTINT);
      });
    }

    this.healthLevel.setCrop(
      0,
      0,
      (this.healthLevel.width * (this.catState.energy / 100)).toFixed(0),
      150
    );
    this.eatLevel.setCrop(
      0,
      0,
      (this.eatLevel.width * (this.catState.hunger / 100)).toFixed(0),
      150
    );
    this.waterLevel.setCrop(
      0,
      0,
      (this.waterLevel.width * (this.catState.thirst / 100)).toFixed(0),
      150
    );
    this.funLevel.setCrop(
      0,
      0,
      (this.funLevel.width * (this.catState.happiness / 100)).toFixed(0),
      150
    );

    this.physics.add.overlap(this.cat, this.mouse, () => {
      this.showDialog('mouse');
    });
  }

  catAttitude() {
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
      this.itemsCreator.createShit();

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

      let catMakeSound = [7, 23];

      if (catMakeSound.includes(Phaser.Math.Between(0, 25))) {
        this.sound.play('meow', { volume: 0.2 });
      }
    }, 1000);
  }

  happinessMonitor() {
    setInterval(() => {
      if (this.catState.scared) {
        this.catState.happiness -= 20;
      }

      if (this.shit !== undefined && this.shit.active) {
        this.catState.happiness -= 2;
      }
    }, 1000);
  }

  getRandom(): number {
    return Phaser.Math.Between(2000, 7000);
  }

  dayNightChanger() {
    this.isDay = !this.isDay;
    const setMouse = [3, 5, 7];

    if (this.isDay) {
      if (this.mouse !== undefined) {
        this.mouse.destroy();
      }
      this.dayCycle = 60;
      this.roomDay.setVisible(true);
      this.roomNight.setVisible(false);
      this.doorIcon.clearTint();
      this.doorIcon.setAlpha(1);
      this.doorIcon.setScale(0.1);
      this.doorIcon.y = this.panel.y - 60;
      this.cat.clearTint();
      this.bowl !== undefined && this.bowl.active ? this.bowl.clearTint() : null;
      this.drink !== undefined && this.drink.active ? this.drink.clearTint() : null;
      this.mop !== undefined && this.mop.active ? this.mop.clearTint() : null;
    } else {
      this.dayCycle = 40;
      this.roomDay.setVisible(false);
      this.roomNight.setVisible(true);
      this.doorIcon.setAlpha(0.7);
      this.doorIcon.setScale(0.07);
      this.doorIcon.y = this.panel.y - 50;
      this.doorIcon.setTint(Color.NIGHTTINT);
      this.cat.setTint(Color.NIGHTTINT);
      this.bowl !== undefined && this.bowl.active ? this.bowl.setTint(Color.NIGHTTINT) : null;
      this.drink !== undefined && this.drink.active ? this.drink.setTint(Color.NIGHTTINT) : null;
      this.mop !== undefined && this.mop.active ? this.mop.setTint(Color.NIGHTTINT) : null;

      if (setMouse.includes(Phaser.Math.Between(1, 10))) {
        this.itemsCreator.createMouse();
      }
    }
  }

  updateTimer() {
    this.gameTime.sec++;

    if (this.gameTime.sec === 60) {
      this.gameTime.min++;
      this.gameTime.sec = 0;
    }

    if (this.clock < this.dayCycle) {
      this.clock++;
    } else {
      this.dayNightChanger();
      this.clock = 0;
    }
  }

  showDialog(info) {
    this.dialog.setVisible(true);

    if (info === 'eMark') {
      this.dialogIcon.setTexture('eMark').setVisible(true).setScale(0.08);
      this.catState.scared = true;

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
        this.catState.scared = false;
      }, 2000);
    }

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
      this.sound.play('meow', { volume: 0.6 });
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

    if (info === 'balloon') {
      this.dialogIcon.setTexture('balloonIcon').setVisible(true).setScale(0.1);
      this.catState.happiness += 40;

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

    if (info === 'drink') {
      this.dialogIcon.setTexture('drinkEmo').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 2000);
    }

    if (info === 'sleep') {
      this.dialogIcon.setTexture('sleepEmo').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 2000);
    }

    if (info === 'night') {
      this.dialogIcon.setTexture('nightIcon').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 3000);
    }

    if (info === 'outdoor') {
      this.dialogIcon.setTexture('outdoorIcon').setVisible(true).setScale(0.1);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 3000);
    }
  }
}
