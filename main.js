
//VAR
var c;
var ctx;
var cat;
var end;

var background = new Image();
background.src = "./assets/img/background.jpg";

var player = new Image();
player.src = "./assets/img/cat.png";

var pipeup = new Image();
pipeup.src = "./assets/img/tubo_up.png"; 

var pipedown = new Image();
pipedown.src = "./assets/img/tubo_down.png";

class Player {
    constructor() {
        this.x = 10;
        this.y = 150;
        this.vy = 0;
        this.g = 0.1;
    }

    show() {
        ctx.drawImage(player, this.x, this.y, 50, 100);
    }

    fly() {
        this.vy = -2;
    }

    gravity() {
        this.y += this.vy;
        this.vy += this.g;
    }
}


var pi = [];
pi[0] = {
    x: 288,
    y: 0,
};

var start = false;

function gameOver() {
    document.getElementById("over").style.visibility = "visible";
}

function gameStart() {
    document.getElementById("startBtn").style.visibility = "none";
    start = true;
    console.log("START!")
}

function update() {
    ctx.drawImage(background, 0, 0, 288, 384);
   
    for (var i = 0; i < pi.length; i++) {
        ctx.drawImage(pipeup, pi[i].x, pi[i].y, 60, 250);
        ctx.drawImage(pipedown, pi[i].x, pi[i].y+360, 60, 250);
        pi[i].x--;

        if (pi[i].x == 60) {
            pi.push({x:288,y:Math.floor(Math.random()*200)-200})
        }

        //game over
        if (cat.x == pi[i].x-45 && (cat.y >= pi[i].y && cat.y <= pi[i].y + 220)) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if (cat.x == pi[i].x +15 && (cat.y >= pi[i].y && cat.y <= pi[i].y + 220)) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if ((cat.y >= pi[i].y && cat.y <= pi[i].y + 220) && (cat.x >= pi[i].x && cat.x <= pi[i].x + 40)){
            gameOver();
            clearInterval(end);
            console.log("game over");
        }


        if (cat.x == pi[i].x - 45 && cat.y >= pi[i].y + 280) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if (cat.x == pi[i].x + 15 && cat.y >= pi[i].y + 280) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

    }
    cat.show();
    cat.gravity();
}

function setup() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    cat = new Player();
    document.body.addEventListener("mousedown", fly => {
        cat.fly();
        console.log("blar blar blar");
    });
        end = setInterval("update()", 10);

}