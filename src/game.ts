import "phaser";
import { MenuScene } from "./scenes/menu-scene";
import { RoomScene } from "./scenes/room-scene";
import { OutdoorScene } from "./scenes/outdoor-scene";
import { CreditsScene } from "./scenes/credits-scene";


const config: Phaser.Types.Core.GameConfig = {
  width: 900,
  height: 700,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MenuScene, RoomScene, OutdoorScene, CreditsScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  const game = new Game(config);
  window.focus();
});

