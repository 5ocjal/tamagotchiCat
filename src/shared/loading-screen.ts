import { Color } from "./enums";

export class LoadingScreen {
    
    showLoadingProgress(game){

        const progressBar = game.add.graphics();
        const progressBox = game.add.graphics();
        progressBox.fillStyle(0xffbf00, 0.8);
        progressBox.fillRect(300, 350, 320, 50);
        
        const width = game.cameras.main.width;
        const height = game.cameras.main.height;
        const loadingText = game.make.text({
            x: width / 2,
            y: height / 2 - 25,
            text: 'Budzenie kota...',
            style: {
                font: '18px Roboto',
                fill: Color.ORANGE,
            },
        });
        loadingText.setDepth(2);
        loadingText.setOrigin(0.5, 0.5);
        
        const percentText = game.make.text({
            x: width / 2,
            y: height / 2 + 25,
            text: '0%',
            style: {
                font: '18px Roboto',
                fill: Color.ORANGE,
            },
        });
        percentText.setDepth(2);
        percentText.setOrigin(0.5, 0.5);
        
        
        
        game.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.setDepth(1);
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(310, 360, 300 * value, 30);
            percentText.setText((value * 100).toFixed(0) + '%');
        });
        
        game.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }
}