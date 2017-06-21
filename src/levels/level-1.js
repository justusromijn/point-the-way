import * as level from './level';

export default {
    init: function(callback) {
        let grid = [
                [
                    { pointable: true, pointed: true },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false, finish: true }
                ]
            ],
            current = {
                x: 0,
                y: 0
            },
            actions = {
                left: 0,
                down: 0,
                right: 2,
                up: 0
            };

        level.init({
            title: "Level 1",
            help: "Use your arrow keys to fill the squares. You start at the left, so press right to begin.",
            grid: grid,
            current: current,
            actions: actions
        }, callback);
    }
}