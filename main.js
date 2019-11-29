let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let interval;
let frames = 0;
let animationCurrentFrame=0;
let scene=1;



//RECURSOS
let maxLife=12
let homescreenImg = document.getElementById('homescreen');
let backgroundImg = document.getElementById('background');
let squirtleImgLeft = document.getElementById('squirtle-left');
let squirtleImgRight = document.getElementById('squirtle-right');
let charmanderImgLeft = document.getElementById('charmander-left');
let waterballImg = document.getElementById('waterball');
let fireballImg = document.getElementById('fireball');
let homeAudio = document.getElementById('home-music');
let battleAudio = document.getElementById('battle-music');


//CLASES

class Pokemon {
    constructor(x,y,w,h,direction,img,pbImg){
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
        this.pbImg = pbImg;
        
        
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
        this.powerBall.push(new PowerBall(xPos,this.y,40,40,this.direction,this.pbImg))
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
    constructor(x,y,w,h,direction,img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 8;
        this.direction =direction;
        this.damage = 0.75;
        this.img = img
    }
    
    draw(){
        this.x+=this.speed*this.direction;
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h)
    }
    crashWith(item) {
        return (this.x < item.x + item.w) &&
        (this.x + this.w > item.x) &&
        (this.y < item.y + item.h) &&
        (this.y + this.h > item.y);
    }
}

// INSTANCIAS

let player1 = new Pokemon (100,300,80,80,1,charmanderImgLeft,fireballImg);
let player2 = new Pokemon (800,300,80,80,-1,squirtleImgRight,waterballImg);

//CONTROLES
let controls = [];

window.addEventListener('keydown', function (e) {
    if(e.keyCode ==13){scene=2}
    if(e.keyCode == 37) {
        if(player2.cant > 0) {
            player2.makePowerBall()
            player2.cant--
            if(player2.cant <= 0) {
                setTimeout(()=> player2.cant = 3, 800)
            }
        }
    }
    if(e.keyCode == 68) {
        if(player1.cant > 0) {
            player1.makePowerBall()
            player1.cant--
            if(player1.cant <= 0) {
                setTimeout(()=> player1.cant = 3, 800)
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

//scene inicial

function homeScreen(){
    ctx.drawImage(homescreenImg,0,0,canvas.width,canvas.height);
    homeAudio.play();
}

function gameOver(player) {
    if(player.life <= 0) {
        clearInterval(interval);
    }
}

function refresh(){
    if(scene==1){            
        homeScreen();
    }
    else{
        homeAudio.pause();
        battleAudio.play();
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height)
        frames++;
        if(frames%20==0){
        animationCurrentFrame = ++animationCurrentFrame % 3;
        }
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
    

}

interval = setInterval(refresh, 1000/60);

