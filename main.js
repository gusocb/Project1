let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

let interval;

class Pokemon {
    constructor(x,y,w,h,){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life = 5;
    }
    draw(){
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

class Attack {
    constructor(x,y,w,h,){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 10;
    }

    draw(){
        ctx.fillStyle = 'blue'
        
    }
}

// INSTANCIAS
let squirtle = new Pokemon (100,100,60,60);

//LO QUE SE VE

function upload(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    squirtle.draw();
    

}

interval = setInterval(upload, 1000/60);
