//@ts-check
import { canvas, ctx} from "./common/canvas.js";
import { GameManager } from "./game-manager.js";

let game = new GameManager();
game.initialize()

let lastTimeStamp = 0;

function gameLoop(timeStamp) {
    let elapsedTime = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    game.update(elapsedTime);
	game.draw();

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);