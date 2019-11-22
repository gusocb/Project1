let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let interval;

class Pokemon {
    constructor(x,y,w,h,color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life = 5;
        this.color = color
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

class PowerBall {
    constructor(x,y,w,h,color,direction){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 10;
        this.color = color;
        this.direction =direction;
    }
    
    draw(){
        ctx.fillStyle = this.color
        this.x+=this.speed*this.direction;
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
}

// INSTANCIAS
let powerBall = []; 
let powerBall2 = []; 
let squirtle = new Pokemon (100,300,60,60, 'blue');
let charmander = new Pokemon (800,300,60,60, 'red')

//COMPLEMENTOS

//PODERES JUGADOR 1
function makePowerBall1(){
    powerBall.push(new PowerBall(150,290,40,40,'yellow',1))
}

function drawPowerBall1(){
    powerBall.forEach(function(ele){
        ele.draw();
    })
}

//PODERES JUGADOR 2
function makePowerBall2(){
    powerBall2.push(new PowerBall(750,310,40,40, 'green',-1))
}

function drawPowerBall2(){
    powerBall2.forEach(function(ele){
        ele.draw();
    })
}


//LO QUE SE VE

function refresh(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    squirtle.draw();
    charmander.draw();
    drawPowerBall1();
    drawPowerBall2();

}

//CONTROLES

window.addEventListener('keydown', function(e) {
    if(e.which == 90) {
        makePowerBall1();
    }
    else if (e.which ==77){
        makePowerBall2();
    }
});



interval = setInterval(refresh, 1000/60);