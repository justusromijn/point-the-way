import * as draw from '../draw';
import * as events from '../events';
import theme from '../theme';

let options, callback, introFade, reset;

export function init(opts, _callback){
    options = opts;
    reset = JSON.parse(JSON.stringify(opts));
    callback = _callback;
    startIntro(startLevel);
}

function startIntro(done){
    introFade = 100;
    draw.add(drawIntro);

    function updateFade() {
        if (introFade < 1){
            return;
        }

        introFade--;
        setTimeout(() => {
            updateFade();
        }, 10);
    }

    setTimeout(() => {
        updateFade();
    }, 500);

    setTimeout(() => {
        draw.remove(drawIntro);
        done();
    }, 2000);
}

function startLevel(){
    events.on("DOWN", onDown);
    events.on("UP", onUp);
    events.on("LEFT", onLeft);
    events.on("RIGHT", onRight);
    draw.add(drawLevel);
}

function drawIntro(ctx, canvas){
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.font = "24px serif";
    ctx.fillStyle = `rgba(255, 255, 255, ${introFade / 100}`;
    ctx.textAlign = "center";
    ctx.fillText(options.title, centerX, centerY);
    ctx.closePath();
}

function drawLevel(ctx, canvas){
    // TODO show move counters
    // TODO show introduction texts
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const cellSize = 30;

    const yCols = options.grid.length;
    const xCols = options.grid[0].length;

    let left = centerX - (cellSize * xCols) / 2,
        top = centerY - ((cellSize * yCols) / 2);

    options.grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex)=> {
            let cellLeft = left + (cellSize * cellIndex);
            let cellTop = top + (cellSize * rowIndex);

            ctx.fillStyle = theme.colors.tertiary;
            if (cell.finish){
                ctx.fillStyle = theme.colors.secondary;
            }
            if (!cell.pointable){
                ctx.fillStyle = theme.colors.black;
            }
            ctx.fillRect(cellLeft, cellTop, cellSize, cellSize);
            ctx.rect(cellLeft, cellTop, cellSize, cellSize);
            ctx.strokeStyle = theme.colors.black;
            ctx.lineWidth = theme.strokes.secondary;
            ctx.stroke();
            if (cell.pointed){
                ctx.fillStyle = theme.colors.black;
                ctx.fillRect(cellLeft + 5, cellTop + 5, cellSize - 10, cellSize - 10);
            }
        });
    });

    ctx.closePath();
}

function updatePosition(){
    options.grid[options.current.y][options.current.x].pointed = true;

    if (options.grid[options.current.y][options.current.x].finish){
        let activeCells = options.grid.find((row) => row.find((cell) => !cell.pointed && cell.pointable));
        if (activeCells){
            // DIDN'T USE ALL CELLS
            // TODO show message and fade before reset
            console.log("CELLS MISSED...");
            // RESET
            Object.assign(options, JSON.parse(JSON.stringify(reset)));
            return;
        }

        draw.remove(drawLevel);
        events.off("DOWN", onDown);
        events.off("UP", onUp);
        events.off("LEFT", onLeft);
        events.off("RIGHT", onRight);
        callback();
    } else {
        let leftCell = options.grid[options.current.y][options.current.x -1] || {};
        let rightCell = options.grid[options.current.y][options.current.x +1] || {};
        let upCell = (options.grid[options.current.y -1] || {})[options.current.x] || {};
        let downCell = (options.grid[options.current.y + 1] || {})[options.current.x] || {};
        // DETECT IF VALID MOVES ARE AVAILABLE
        if ((!options.actions.left || (!leftCell.pointable || leftCell.pointed)) &&
            (!options.actions.right || (!rightCell.pointable || rightCell.pointed)) &&
            (!options.actions.up || (!upCell.pointable || upCell.pointed)) &&
            (!options.actions.down || (!downCell.pointable || downCell.pointed))
        ){
            // TODO show message and fade before reset
            console.log("NO MORE MOVES...");
            Object.assign(options, JSON.parse(JSON.stringify(reset)));
            return;
        }

    }
}

function onUp(){
    moveGrid("y",-1,"up");
}
function onDown(){
    moveGrid("y",1,"down");
}
function onLeft(){
    moveGrid("x",-1,"left");
}
function onRight() {
    moveGrid("x",1,"right");
}

function moveGrid(axis,shift,direction){
    let target;
    if (axis === "x"){
        target = options.grid[options.current.y][options.current.x + shift];
    } else {
        target = (options.grid[options.current.y + shift] || {})[options.current.x];
    }

    if (target && options.actions[direction] > 0 && target.pointable && !target.pointed){
        options.current[axis] = options.current[axis] + shift;
        options.actions[direction]--;
        updatePosition();
    }
}