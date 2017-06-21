import * as level from './level';

export default {
    init: function(callback) {
        let grid = [
                [
                    { pointable: true, pointed: true },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false }
                ],[
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false }
                ],[
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false, finish: true },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false }
                ],
                [
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false }
                ],
                [
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false }
                ]
            ],
            current = {
                x: 0,
                y: 0
            },
            actions = {
                left: 6,
                down: 6,
                right: 8,
                up: 4
            };

        level.init({
            title: "Level 4",
            help: "Tick tock, around the clock? Take a look at the amount of moves you have to find the correct path.",
            grid: grid,
            current: current,
            actions: actions
        }, callback);
    }
}