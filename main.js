let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let interval;
let frames = 0;
let animationCurrentFrame=0;

//RECURSOS
let maxLife=12
let backgroundImg = document.getElementById('background');
let squirtleImgLeft = document.getElementById('squirtle-left');
let squirtleImgRight = document.getElementById('squirtle-right');

//CLASES

class Pokemon {
    constructor(x,y,w,h,direction,img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life = maxLife;
        this.speed = 13;
        this.powerBall = [];
        this.direction = direction;
        this.cant = 3;
        this.img = img;
        
        
    }
    draw(){
        ctx.drawImage(this.img,animationCurrentFrame*115/3,0,115/3,36,this.x,this.y,this.w,this.h)
    }
    drawHealthBar(){
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x,50,maxLife*15,40)
        if (this.life > 5){
            ctx.fillStyle = 'green'
            ctx.fillRect(this.x,50,this.life*15,40);
        }
        else{
            ctx.fillStyle= 'red'
            ctx.fillRect(this.x,50,this.life*15,40);
        }
    }
    crashWith(item) {
        return (this.x < item.x + item.w) &&
        (this.x + this.w > item.x) &&
        (this.y < item.y + item.h) &&
        (this.y + this.h > item.y);
    }
    makePowerBall(){
        let xPos = this.direction == 1 ? this.x + this.w : this.x
        this.powerBall.push(new PowerBall(xPos,this.y,40,40,this.color,this.direction))
    }
    drawPowerBall(){
        this.powerBall.forEach(function(ele){
            ele.draw();
        })
    }
    checkCollition(oponent) {
        this.powerBall.forEach((ele, i) => {
            if(ele.crashWith(oponent)) {
                this.powerBall.splice(i, 1);
                oponent.life-=ele.damage;
            }
        });
    }
}

class PowerBall {
    constructor(x,y,w,h,color,direction){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 8;
        this.color = color;
        this.direction =direction;
        this.damage = 0.75;
    }
    
    draw(){
        ctx.fillStyle = this.color
        this.x+=this.speed*this.direction;
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
    crashWith(item) {
        return (this.x < item.x + item.w) &&
        (this.x + this.w > item.x) &&
        (this.y < item.y + item.h) &&
        (this.y + this.h > item.y);
    }
}

// INSTANCIAS

let player1 = new Pokemon (100,300,80,80,1,squirtleImgLeft);
let player2 = new Pokemon (800,300,80,80,-1,squirtleImgRight);

//CONTROLES
let controls = [];

window.addEventListener('keydown', function (e) {
    if(e.keyCode == 37) {
        if(player2.cant > 0) {
            player2.makePowerBall()
            player2.cant--
            if(player2.cant <= 0) {
                setTimeout(()=> player2.cant = 3, 1000)
            }
        }
    }
    if(e.keyCode == 68) {
        if(player1.cant > 0) {
            player1.makePowerBall()
            player1.cant--
            if(player1.cant <= 0) {
                setTimeout(()=> player1.cant = 3, 1000)
            }
        }
    }
    controls = (controls || [])
    controls[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
    controls[e.keyCode] = false;
});

function controlPlayer(){
    if (controls && controls[40]) {player2.y+=player2.speed}
    if (controls && controls[38]) {player2.y-=player2.speed}
    if (controls && controls[83]) {player1.y+=player1.speed}
    if (controls && controls[87]) {player1.y-=player1.speed}
    
}

function checkBorders(player){
    if(player.y <= 100){player.y = 100};
    if(player.y >= canvas.height - player.h) {player.y =canvas.height-player.h };
}

//EL JUEGO

function gameOver(player) {
    if(player.life <= 0) {
        clearInterval(interval);
    }
}

function refresh(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height)
    frames++;
    animationCurrentFrame = ++animationCurrentFrame % 3;
    player1.drawPowerBall();
    player2.drawPowerBall();
    player1.checkCollition(player2);
    player2.checkCollition(player1);
    player1.draw();
    player2.draw();
    player1.drawHealthBar();
    player2.drawHealthBar();
    controlPlayer();
    checkBorders(player1);
    checkBorders(player2);
    gameOver(player1);
    gameOver(player2);
    

}

interval = setInterval(refresh, 1000/60);
