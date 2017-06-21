import * as draw from './draw';
import * as events from './events';
import theme from './theme';
let callback = null;
const itemWidth = 250;
const itemHeight = 100;
const spacing = 10;
let menuItems = [
    {
        title: "New game",
        selected: true,
        action: function() {
            callback("NEW");
        }
    },
    {
        title: "Credits",
        selected: false,
        action: function() {
            callback("CREDITS");
        }
    }
];
const total = menuItems.length;

export default {
    init: function(_callback) {
        callback = _callback;
        draw.add(render);
        events.on("ENTER", onEnter);
        events.on("DOWN", onDown);
        events.on("UP", onUp);
    },

    exit: function() {
        events.off("ENTER", onEnter);
        events.off("DOWN", onDown);
        events.off("UP", onUp);
        draw.remove(render);
    }
}

function onEnter() {
    menuItems.find((el) => el.selected).action();
}

function onDown() {
    let current = menuItems.findIndex((el) => el.selected);

    if(menuItems[current + 1]) {
        menuItems[current].selected = false;
        menuItems[current + 1].selected = true;
    }
}
function onUp() {
    let current = menuItems.findIndex((el) => el.selected);

    if(menuItems[current - 1]) {
        menuItems[current].selected = false;
        menuItems[current - 1].selected = true;
    }
}

function render(ctx, canvas) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    menuItems.forEach((item, index) => {

        let left = centerX - itemWidth / 2,
            top = centerY - ((itemHeight * total) / 2) + ((itemHeight + spacing) * index);

        ctx.beginPath();

        if(item.selected) {
            ctx.fillStyle = theme.colors.highlight;
            ctx.fillRect(left, top, itemWidth, itemHeight);
        }

        ctx.rect(left, top, itemWidth, itemHeight);
        ctx.strokeStyle = theme.colors.primary;
        ctx.lineWidth = theme.strokes.primary;
        ctx.stroke();
        ctx.font = "24px serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(item.title, left + itemWidth / 2, top + 55);
        ctx.closePath();
    });
}