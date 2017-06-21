let listeners = {
    UP: [],
    DOWN: [],
    LEFT: [],
    RIGHT: [],
    ENTER: []
};

const KEYMAPPING = {
    ArrowDown: 'DOWN',
    ArrowUp: 'UP',
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT',
    Enter: 'ENTER'
};

export function on(type, listener){
    listeners[type].push(listener);
}
export function off(type, listener){
    let index = listeners[type].indexOf(listener);
    listeners[type].splice(index, 1);
}

function onKeyDown(e) {
    (listeners[KEYMAPPING[e.key]] || []).forEach((listener) => {
        listener();
    });
}

document.addEventListener('keydown', onKeyDown);