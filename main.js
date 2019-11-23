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
        this.speed = 15;
        this.color = color
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    crashWith(item) {
        return (this.x < item.x + item.w) &&
        (this.x + this.w > item.x) &&
        (this.y < item.y + item.h) &&
        (this.y + this.h > item.y);
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
    crashWith(item) {
        return (this.x < item.x + item.w) &&
        (this.x + this.w > item.x) &&
        (this.y < item.y + item.h) &&
        (this.y + this.h > item.y);
    }
}

// INSTANCIAS
let powerBall = []; 
let powerBall2 = []; 
let squirtle = new Pokemon (100,300,60,60, 'blue');
let charmander = new Pokemon (800,300,60,60, 'red')

//COMPLEMENTOS

//Poderes Jugador 1
function makePowerBall1(){
    powerBall.push(new PowerBall(squirtle.x+squirtle.w,squirtle.y,40,40,'blue',1))
}

function drawPowerBall1(){
    powerBall.forEach(function(ele){
        ele.draw();
    })
}

//Poderes Jugador 2
function makePowerBall2(){
    powerBall2.push(new PowerBall(charmander.x,charmander.y,40,40, 'red',-1))
}

function drawPowerBall2(){
    powerBall2.forEach(function(ele){
        ele.draw();
    })
}

//Revisa si se da la colisión
function checkCollition() {
    powerBall.forEach((ele, i) => {
        if(ele.crashWith(charmander)) {
            powerBall.splice(i, 1);
        }
    });
}

function checkCollition2() {
    powerBall2.forEach((ele, i) => {
        if(ele.crashWith(squirtle)) {
            powerBall2.splice(i, 1);
        }
    });
}





//EL JUEGO

function refresh(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    squirtle.draw();
    charmander.draw();
    drawPowerBall1();
    drawPowerBall2();
    checkCollition();
    checkCollition2();

}

//CONTROLES

window.addEventListener('keydown', function(event) {
    switch (event.which){
        case 68:
            makePowerBall1();
            break
        
        case 37:
            makePowerBall2();
            break
        
        case 87:
            squirtle.y-=squirtle.speed
            break

        case 83:
            squirtle.y+=squirtle.speed
            break

        case 38:
            charmander.y-=charmander.speed
            break

        case 40:
            charmander.y+=charmander.speed
            break

    } 
    
});



interval = setInterval(refresh, 1000/60);