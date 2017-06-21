import * as level from './level';

export default {
    init: function(callback) {
        let grid = [
                [
                    { pointable: true, pointed: true },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false }
                ],[
                    { pointable: true, pointed: false },
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
                down: 2,
                right: 2,
                up: 1
            };

        level.init({
            title: "Level 3",
            help: "Make sure you hit all the blocks before going into the finish.",
            grid: grid,
            current: current,
            actions: actions
        }, callback);
    }
}