let drawables = [],
    canvas = null,
    ctx = null;

export function start(_canvas) {
    canvas = _canvas;
    ctx = canvas.getContext('2d');
    drawLoop();
}

export function add(fn) {
    drawables.push(fn);
}

export function remove(fn) {
    let index = drawables.indexOf(fn);
    drawables.splice(index, 1);
}

function draw() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    drawables.forEach(function (fn) {
        if (typeof fn === 'function') {
            fn(ctx, canvas);
        } else {
            console.warn('Drawable is not a function.');
        }
    });
}

function drawLoop() {
    draw();
    requestAnimationFrame(drawLoop);
}