import * as level from './level';

export default {
    init: function(callback) {
        let grid = [
                [
                    { pointable: false, pointed: false },
                    { pointable: false, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                ],

                [
                    { pointable: true, pointed: true },
                    { pointable: false, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: false, pointed: false },
                    { pointable: true, pointed: false, finish: true }
                ],

                [
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: true, pointed: false },
                    { pointable: false, pointed: false },
                    { pointable: false, pointed: false }
                ]
            ],
            current = {
                x: 0,
                y: 1
            },
            actions = {
                left: 0,
                down: 2,
                right: 4,
                up: 2
            };

        level.init({
            title: "Level 2",
            help: "Follow the path with the arrow keys.",
            grid: grid,
            current: current,
            actions: actions
        }, callback);
    }
}