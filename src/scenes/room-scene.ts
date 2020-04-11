import { CatService } from "../catService"


export class RoomScene extends Phaser.Scene {

    catService = new CatService();

    constructor() {
        super({
            key: 'RoomScene'
        });

    }
    
    preload(){
        console.log('room')

    }

    create(){
        this.add.text(100, 100, 'ROOM', {
          fontFamily: 'Indie Flower',
          fontSize: '75px',
          fill: '#E2FCEF',
        });
    }

    update(){

    }
}