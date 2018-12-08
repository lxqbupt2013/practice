let allEnemies = [];
let allGems = [];
let score = 0;
let iswin = false;

const CELL_WIDTH = 101;

/**
* @description 虫类
* @constructor
* @param {string} sprite - 贴图
* @param {number} x - X 轴坐标
* @param {number} y - Y 轴坐标
* @param {number}  speed - 移动速度
*/
class Enemy {

    constructor(sprite, x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed || (70 + Math.random() * 80);

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = sprite;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed;
        this.outlineCheck();
    }

    outlineCheck(x, y, speed) {
        if (this.x > 402) {
            this.x = -10;
            // Recharge random speed to simulate new enemy
            this.speed = speed || (70 + Math.random() * 80);
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    // Impact checking for player and emeny
    checkCollision(player) {
        let yCheck = Math.abs(this.y - player.y) < 40;
        let xCheck = Math.abs(this.x - player.x) < 50;

        if (yCheck && xCheck) {
            player.reset();
            score = 0;
            return true;
        }
        return false;
    }

    reset() {
        allEnemies.forEach(function (enemy) {
            enemy.y = 83 * Math.floor(Math.random() * 3) + 55;
            enemy.speed = 70 + Math.random() * 80;
        });
    }
}

/**
* @description 玩家类
* @constructor
* @param {string} sprite - 贴图
* @param {number} x - X 轴坐标
* @param {number} y - Y 轴坐标
*/
class Player {

    constructor(sprite, x, y) {
        this.x = x;
        this.y = y;
        //this.sprite = 'images/char-boy.png';
        this.sprite = sprite;
    }

    // Update the player's position, required method for game
    update(dt) {
        this.outlineCheck();
        // this.win();
    }

    reset() {
        this.x = CELL_WIDTH * 2;
        this.y = 83 * 3 + 55;
        iswin = false;
    }

    // Draw the player on the screen, required method for game
    render() {
        // ctx.restore();
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Player direction control
    handleInput(movement) {
        switch (movement) {
            case 'left':
                this.x -= CELL_WIDTH;
                break;
            case 'right':
                this.x += CELL_WIDTH;
                break;
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
                break;
        }
    }

    // Player's boundary detection
    outlineCheck() {
        if (this.x > 402) {
            this.x = 402;
        }

        if (this.x < -2) {
            this.x = -2;
        }

        if (this.y < -28) {
            this.y = -28;
        }

        if (this.y > 387) {
            this.y = 387;
        }

    }

    // Victory checking
    win() {

        if (this.y < 55 && iswin === false) {

            score = score + 300;

            iswin = true;
        }

        this.outlineCheck();

        return iswin;
    };
}

/**
* @description 宝石类
* @constructor
* @param {string} sprite - 贴图
* @param {number} x - X 轴坐标
* @param {number} y - Y 轴坐标
* @param {number}   type - 宝石种类
*/
class Gem {
    // Gem objects
    // Player picks for extra points
    constructor(sprite, x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.sprite = ['images/gem-blue.png',
            'images/gem-green.png',
            'images/gem-orange.png'
        ];
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite[this.type]), this.x, this.y);
    }

    // Impact checking for player and gems
    checkCollision(player) {

        let yCheck = Math.abs(this.y - player.y) < 38;
        let xCheck = Math.abs(this.x - player.x) < 5;

        if (yCheck && xCheck) {
            if (this.type === 0) {
                score = score + 10;
            }

            if (this.type === 1) {
                score = score + 20;
            }

            if (this.type === 2) {
                score = score + 30;
            }

            this.x = -150;
            this.y = -150;
            return true;
        }
        return false;
    };

    reset() {
        allGems.forEach(function (gem) {
            gem.x = 100 * Math.floor(Math.random() * 5);
            gem.y = 83 * Math.floor(Math.random() * 3) + 90;
            gem.type = Math.floor(Math.random() * 3);

        });
    };
}


let player = new Player('images/char-boy.png', 100 * 2, 83 * 3 + 55);

window.onload = function () {

    // Random enemy number between 3 and 6
    let enemyNum = 3 + Math.floor(Math.random() * 3);

    let enemyCreateDt = -1;

    let createGems = function () {
        // Random gem number between 1 and 3
        let gemsNum = 1 + Math.floor(Math.random() * 2);

        for (let i = 0; i <= gemsNum; i++) {
            let gemInitX = 100 * Math.floor(Math.random() * 5);
            let gemInitY = 83 * Math.floor(Math.random() * 3) + 90;
            let gemIntiType = Math.floor(Math.random() * 3);
            let gem = new Gem('', gemInitX, gemInitY, gemIntiType);
            allGems.push(gem);
        }
    };

    createGems();

    // Create an enemy
    let createEnemy = function () {
        let enemyInitY = 83 * Math.floor(Math.random() * 3) + 55;
        let enemy = new Enemy('images/enemy-bug.png', 0, enemyInitY);
        return enemy;
    };

    // Create enemies in order
    let creatEnemies = setInterval(function () {
        allEnemies.push(createEnemy());
        enemyCreateDt++;
        if (enemyCreateDt === enemyNum) {
            clearInterval(creatEnemies);
        }

    }, 500);

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
