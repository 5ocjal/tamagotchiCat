import { OutdoorScene } from './../scenes/outdoor-scene';
export class ControlCenter {
  control;

  constructor(item) {
    this.control = item;
  }

  createContol() {
    this.control.eatIcon.on('pointerdown', () => {
      if (
        this.control.bowl === undefined ||
        (this.control.bowl.active === false && this.control.drink.active === false)
      ) {
        this.control.bowl = this.control.physics.add.sprite(280, -20, 'eatIcon').setScale(0.12);
        this.control.physics.add.collider(this.control.bowl, this.control.floor);
        this.control.physics.add.overlap(this.control.cat, this.control.bowl, () => {
          this.startEating(this.control.cat.x, this.control.bowl.x);
        });
      }
    });
    this.control.waterIcon.on('pointerdown', () => {
      if (
        this.control.drink === undefined ||
        (this.control.drink.active === false && this.control.bowl.active === false)
      ) {
        this.control.drink = this.control.physics.add.sprite(570, -20, 'waterBowl').setScale(0.1);
        this.control.physics.add.collider(this.control.drink, this.control.floor);
        this.control.physics.add.overlap(this.control.cat, this.control.drink, () => {
          this.startDrinking(this.control.cat.x, this.control.drink.x);
        });
      }
    });
    this.control.balloonIcon.on('pointerdown', () => {

        this.control.balloon = this.control.physics.add.group({
          key: 'balloonBoom',
          repeat: 0,
          setXY: {
            x: Phaser.Math.Between(30, 130),
            y: 1600,
          },
        });

        this.control.balloon.children.iterate((child) => {
          child
          .setMass(0)
          .setBounce(0.5)
          .setDepth(2)
          .setInteractive()
          .setScale(0.3)
          .setCollideWorldBounds(true)
          .on('pointerdown', () => {
                child.play('balloonBoom');
                this.control.showDialog('eMark');
                setTimeout(() => {
                  child.destroy();
                }, 500);
          })
          .setGravity(Phaser.Math.Between(2,5), -320);
          
        })

        setTimeout(() => {
          this.control.showDialog('balloon');
        }, 3000);  
    });

    this.control.bubbleIcon.on('pointerdown', () => {
      this.control.bubbles = this.control.physics.add.group({
        key: 'bubblesBoom',
        repeat: 11,
        setXY: {
          x: 100,
          y: -100,
          stepX: Phaser.Math.Between(20, 200),
          stepY: Phaser.Math.Between(-100, 0),
        },
      });

      this.control.bubbles.children.iterate((child) => {
        child.setScale(0.12);
        child.setMass(0);
        child.setGravity(Phaser.Math.Between(-5, 5), -290);
        setTimeout(() => {
          this.control.catState.happiness += 1;
          child.setScale(0.15);
          child.play('bubblesBoom');
        }, Phaser.Math.Between(7000, 15000));
      });

      this.control.physics.add.collider(this.control.bubbles, this.control.floor);

      setTimeout(() => {
        this.control.showDialog('happy')
      }, 6000);
    });

    this.control.cleanIcon.on('pointerdown', () => {
      if (this.control.shit !== undefined && this.control.shit.active) {
        this.cleanShit();
      }
    });

    this.control.doorIcon.on('pointerdown', () => {
      if (this.control.isDay) {
        this.control.cat.destroy();
        this.control.scene.stop('RoomScene');
        this.control.scene.start('OutdoorScene');
      } else {
        this.control.showDialog('night');
      }
    });
  }

  startEating(catX, bowlX) {
    this.control.cat.play('stand');
    this.control.cat.setVelocity(0);
    if (catX > bowlX) {
      this.control.cat.setScale(0.14, 0.14);
      this.control.cat.setOffset(1100, 0);
      this.actionProgress(this.control.bowl, 'eat');
    }

    if (catX < bowlX) {
      this.control.cat.setScale(-0.14, 0.14);
      this.control.cat.setOffset(-1100, 0);
      this.actionProgress(this.control.bowl, 'eat');
    }
  }

  startDrinking(catX, drinkX) {
    this.control.cat.play('stand');
    this.control.cat.setVelocity(0);
    if (catX > drinkX) {
      this.control.cat.setScale(0.14, 0.14);
      this.control.cat.setOffset(1100, 0);
      this.actionProgress(this.control.drink, 'drink');
    }

    if (catX < drinkX) {
      this.control.cat.setScale(-0.14, 0.14);
      this.control.cat.setOffset(-1100, 0);
      this.actionProgress(this.control.drink, 'drink');
    }
  }

  cleanShit() {
    if (this.control.needClean) {
      this.control.mop = this.control.physics.add.staticImage(
        this.control.shit.x - 65,
        this.control.shit.y - 30,
        'mop'
      );
      this.control.mop.setScale(0.21);

      let swipe = true;
      let looper = 0;
      if (looper < 7) {
        let cleaning = setInterval(() => {
          if (swipe) {
            this.control.mop.x += 55;
            swipe = !swipe;
            looper++;
            if (looper === 7) {
              clearInterval(cleaning);
              this.cleanComplete();
            }
          } else {
            this.control.mop.x -= 55;
            swipe = !swipe;
            looper++;
            if (looper === 7) {
              clearInterval(cleaning);
              this.cleanComplete();
            }
          }
        }, 500);
      }
    }
  }

  cleanComplete() {
    this.control.mop.destroy();
    this.control.trash = this.control.physics.add
      .sprite(this.control.shit.x, this.control.shit.y - 20, 'trash')
      .setScale(0.12);
    this.control.physics.add.collider(this.control.trash, this.control.floor);
    this.control.shit.destroy();
    setTimeout(() => {
      this.control.catState.happiness += 40;
      this.control.trash.setVelocity(400, 10);
    }, 1200);
    setTimeout(() => {
      this.control.trash.destroy();
    }, 3000);
    this.control.needClean = false;
    this.control.showDialog('happy');
  }

  actionProgress(item, action) {
    let swipe = true;
    let looper = 0;
    if (looper < 7) {
      let progress = setInterval(() => {
        if (swipe) {
          item.x += 15;
          swipe = !swipe;
          looper++;
          if (looper === 7) {
            item.destroy();
            switch (action) {
              case 'drink':
                this.control.catState.thirst += 40;
                this.control.showDialog('drink');
                break;
              case 'eat':
                this.control.catState.hunger += 30;
                this.control.showDialog('happy');
                break;
            }
            clearInterval(progress);
          }
        } else {
          item.x -= 15;
          swipe = !swipe;
          looper++;
          if (looper === 7) {
            item.destroy();
            switch (action) {
              case 'drink':
                this.control.catState.thirst += 40;
                break;
              case 'eat':
                this.control.catState.hunger += 30;
                break;
            }
            clearInterval(progress);
          }
        }
      }, 500);
    }
  }
}
