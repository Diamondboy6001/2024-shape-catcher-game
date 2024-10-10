//@ts-check
import { canvas, ctx} from "./common/canvas.js";

export class Player {
    constructor(x = 0,y = 0) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.speed = 5;

        this.keybinding = {
            up: "KeyW",
            down: "KeyS",
            left: "KeyA",
            right: "KeyD"
        };

        this.moving = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        this.wireUpKeyboard();
    }

    wireUpKeyboard() {
        window.addEventListener("keydown", (e) => {
            // console.log(e);

            switch(e.code) {
                case this.keybinding.up:
                    this.moving.up = true;
                    break;
                    case this.keybinding.down:
                    this.moving.down = true;
                    break;
                    case this.keybinding.left:
                    this.moving.left = true;
                    break;
                    case this.keybinding.right:
                    this.moving.right = true;
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            console.log(e);
            switch(e.code) {
                case this.keybinding.up:
                    this.moving.up = false;
                    break;
                    case this.keybinding.down:
                    this.moving.down = false;
                    break;
                    case this.keybinding.left:
                    this.moving.left = false;
                    break;
                    case this.keybinding.right:
                    this.moving.right = false;
                    break;
            }
        });
    }

    update () {
        let dirX =0;
        let dirY =0;

        if(this.moving.up) {
            dirY = -1;
        }

        if(this.moving.down) {
            dirY = 1;
        }

        if(this.moving.up && this.moving.down) {
            dirY = 0;
        }

        if(this.moving.left) {
            dirX = -1;
        }

        if(this.moving.right) {
            dirX = 1;
        }

        if(this.moving.left && this.moving.right) {
            dirX = 0;
        }

        if (this.moving.right&&this.moving.up) {
            dirX = 1/Math.sqrt(2);
            dirY = -1/Math.sqrt(2);
        }   
        
        if (this.moving.right&&this.moving.down) {
            dirX = 1/Math.sqrt(2);
            dirY = 1/Math.sqrt(2);
        }  
        
        if (this.moving.left&&this.moving.up) {
            dirX = -1/Math.sqrt(2);
            dirY = -1/Math.sqrt(2);
        }   

        if (this.moving.left&&this.moving.down) {
            dirX = -1/Math.sqrt(2);
            dirY = 1/Math.sqrt(2);
        }   

        this.x += this.speed * dirX
        this.y += this.speed * dirY

        // prevent going off left
		if (this.x < 0) {
			this.x = 0;
		}
		// prevent going off top
		if (this.y < 0) {
			this.y = 0;
		}
		// prevent from going off right
		if (this.x + this.width > canvas.width) {
			this.x = canvas.width - this.width;
		}
		// prevent from going off bottom
		if (this.y + this.height > canvas.height) {
			this.y = canvas.height - this.height;
		}
    }

    draw() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}