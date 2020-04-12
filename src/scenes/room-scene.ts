import { CatService } from "../catService"


export class RoomScene extends Phaser.Scene {

    catService = new CatService();

    constructor() {
        super({
            key: 'RoomScene'
        });

    }
    
    preload(){
        this.load.image('room', '../../assets/room/room.jpg');
        this.load.spritesheet('catWalk', '../../assets/cat/black/walk.png', {frameWidth: 1082, frameHeight: 811});
        

    }

    create(){
        this.add.sprite(450, 350, 'room').setScale(0.7);

        let cat = this.add.sprite(450, 300, 'catWalk');
        cat
            .setScale(0.2)
            .setFrame('1');


    }

    update(){

    }
}