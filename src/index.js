import * as draw from './draw';
import * as game from './game';

//entities
let canvas;
init();

function init(){
    canvas = document.getElementById('point-the-way');
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    draw.start(canvas);
    game.start();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

