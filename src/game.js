import menu from './menu';
import level1 from './levels/level-1';
import level2 from './levels/level-2';
import level3 from './levels/level-3';
import level4 from './levels/level-4';

export function start() {
    menu.init(handleChoice);
}
function handleChoice(action){
    switch (action) {

        case "NEW":
            menu.exit();
            level1.init(() => {
                console.log("NEXT LEVEL");
                level2.init(() => {
                    level3.init(() => {
                        level4.init(() => {
                            menu.init(handleChoice);
                        });
                    });

                });
            });
            break;

        case "CREDITS":
            // TODO show dumb credits :)
            console.log("SHOWING CREDITS");
            break;

        default:
            console.log("UNKNOWN ACTION");
    }
}