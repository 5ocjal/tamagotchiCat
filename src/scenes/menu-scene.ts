export class MenuScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MenuScene"
    });
  }

  preload(): void {
    this.load.image("catLogo", "../../assets/catLogo.png");
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "catLogo");
  }

  update(): void {

  }
}
