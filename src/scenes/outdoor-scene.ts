import { CatService } from '../shared/catService';
import { AnimationsCreator } from '../shared/animationsCreator';
import { LoadingScreen } from '../shared/loading-screen';

export class OutdoorScene extends Phaser.Scene {
  loadingScreen = new LoadingScreen();
  animService = new AnimationsCreator();
  catService = new CatService();
  needToBeLoad = true;
  backyard;
  ground;
  bush;
  dialog;
  showInfo = false;
  dialogIcon;
  catState = this.catService.loadCatState();
  cat;

  constructor() {
    super({
      key: 'OutdoorScene',
    });
  }

  init() {
    this.cameras.main.setBackgroundColor('#006d8f');
  }

  preload() {
    if (this.needToBeLoad) {
      this.loadingScreen.showLoadingProgress(this);
      this.needToBeLoad = false;
    }

    this.load.image('outdoor', '../../assets/room/outdoor.jpg');
    this.load.image('bush', '../../assets/room/bush.png');
    this.load.image('ground', '../../assets/room/ground.png');
    this.load.image('dialog', '../../assets/gui/dialog.png');
    this.load.image('qMark', '../../assets/gui/icons/qeMark.png');
    this.load.image('eMark', '../../assets/gui/icons/exMark.png');
    this.load.image('monster', '../../assets/gui/icons/monster.png');
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
    this.physics.world.setBounds(-550, 0, 2000, 700);

    this.backyard = this.add.image(250, 350, 'outdoor').setDepth(-1).setVisible(true);
    this.ground = this.physics.add.staticGroup();
    this.ground.create(450, 550, 'ground').setSize(2100, 50).setVisible(false);
    this.bush = this.physics.add.staticGroup();

    this.bush.create(-420, 500, 'bush').setDepth(5).setScale(0.3);
    this.bush.create(-450, 490, 'bush').setDepth(3).setScale(0.28);
    this.bush.create(-540, 520, 'bush').setDepth(3).setScale(0.4);
    this.bush.create(-40, 560, 'bush').setDepth(3).setScale(0.36);
    this.bush.create(120, 530, 'bush').setDepth(3).setScale(0.21);

    this.animService.createCatAnimations(this);
    this.cat = this.physics.add.sprite(700, 470, 'idle');

    this.dialog = this.add
      .image(-420, 370, 'dialog')
      .setDepth(5)
      .setScale(0.4)
      .setAlpha(0.9)
      .setVisible(false);

    this.dialogIcon = this.physics.add
      .staticSprite(this.dialog.x - 10, this.dialog.y - 15, 'qMark')
      .setScale(0.08)
      .setDepth(6)
      .setVisible(false);

    this.cat
      .setBounce(0.2)
      .setMass(120)
      .setCollideWorldBounds(true)
      .setScale(0.05, 0.05)
      .setDrag(10)
      .play('run')
      .setVelocity(-150, 0);

    this.physics.add.collider(this.cat, this.ground);

    this.cameras.main.fadeIn(4000, 0, 109, 143);
    this.cameras.main.startFollow(this.cat).setFollowOffset(0, 180);
  }

  update() {
    this.cat.x <= -190 || this.cat.x >= 700
      ? this.cameras.main.stopFollow()
      : this.cameras.main.startFollow(this.cat).setFollowOffset(0, 180);

    if (!this.showInfo) {
      this.cat.x <= -420 ? this.showDialog() : null;
    }
  }

  showDialog() {
    this.showInfo = true;

    setTimeout(() => {
      this.dialog.setVisible(true);
      this.dialogIcon.setTexture('qMark').setVisible(true).setScale(0.08);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 3000);
    }, 2000);

    setTimeout(() => {
      this.dialog.setVisible(true);
      this.dialogIcon.setTexture('eMark').setVisible(true).setScale(0.08);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
      }, 2000);
    }, 8000);

    setTimeout(() => {
      this.dialog.setVisible(true);
      this.dialogIcon.setTexture('monster').setVisible(true).setScale(0.18);

      setTimeout(() => {
        this.dialogIcon.setVisible(false);
        this.dialog.setVisible(false);
        this.cat.setScale(-0.05, 0.05);
        this.cat.play('run');
        this.cat.setVelocity(200, 100);
        this.backHome();
      }, 3000);
    }, 12000);
  }

  backHome() {
    setTimeout(() => {
      this.cameras.main.fadeOut(2000, 0, 109, 143);

      setTimeout(() => {
        this.showInfo = false;
        this.scene.stop('OutdoorScene');
        this.scene.start('RoomScene');
      }, 5000);
    }, 7000);
  }
}
