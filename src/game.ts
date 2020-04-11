import "phaser";
import { MenuScene } from "./scenes/menu-scene";
import { RoomScene } from "./scenes/room-scene";


const config: Phaser.Types.Core.GameConfig = {
  width: 900,
  height: 700,
  type: Phaser.AUTO,
  parent: "game",
  scene: [MenuScene, RoomScene],
  physics: {
    default: "arcade",
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

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});

