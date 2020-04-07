let catName;

function startGame() {
    this.catName = document.getElementById("fname").value;

    if(this.catName && this.catName.trim() !== ''){
        location.href="./views/game.html";
    }else{
        console.log('DAMN IT')
    }
}