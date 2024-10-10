//@ts-check
import { canvas } from "./common/canvas.js";
import { Player } from "./player.js";
import { SimpleGoodItem } from "./collectables/good.js";
export class GameManager {
	constructor() {
		this.players = [];
		this.collectables = [];
		this.enemies = [];
		this.isGameOver = false;
        this.goodSpawn = {
            lastTime: 0,
            nextTime: 0,
            next: function() {
                this.lastTime = 0;
                this.nextTime = rand(5,15);
            },
            getNewNexsadwawdt: function() {
                this.nextTime = rand(5 * 1000, 15 * 1000);
            }
        };

        this.spawner(0);
	}
	initialize() {
		this.players = [];
		let p1 = new Player(canvas.width / 2, canvas.height / 2);
        p1.x -= p1.width / 2;
        p1.y -= p1.height / 2;
        
		this.players.push(p1);
	}
    update(elapsedTime) {
        this.spawner(elapsedTime);

        this.players.forEach(p => {
            p.update();
        })
        this.collectables.forEach(c => {
            c.update(elapsedTime);
        })
    }
    
    spawner(elapsedTime) {
        this.goodSpawn.lastTime += elapsedTime

        if(this.goodSpawn.lastTime > this.goodSpawn.nextTime) {
            // spawn a good item
            const buffer = 50;
            const sx = rand(buffer, canvas.width - buffer);
            const sy = rand(buffer, canvas.height - buffer);
            const item = new SimpleGoodItem(sx, sy);
            this,this.collectables.push(item);
            this.goodSpawn.next();
            debugger
    }
}

    draw() {
		this.players.forEach((p) => {
			p.draw();
		});
		this.collectables.forEach((c) => {
			c.draw();
		});
	}
}
function rand(max, min) {
    let upper = max - min;
    let r = Math.floor(Math.random() * max);
    return r;
} 