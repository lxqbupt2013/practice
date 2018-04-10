const CELL_WIDTH = CELL_WIDTH;

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed || (70 + Math.random() * 80);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    this.outlineCheck();

};

// Enemy's boundary detection
Enemy.prototype.outlineCheck = function (x, y, speed) {
    if (this.x > 402) {
        this.x = -10;
        // Recharge random speed to simulate new enemy
        this.speed = speed || (70 + Math.random() * 80);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Impact checking for player and emeny
Enemy.prototype.checkCollision = function (player) {

    let yCheck = Math.abs(this.y - player.y) < 40;
    let xCheck = Math.abs(this.x - player.x) < 50;

    if (yCheck && xCheck) {
        player.reset();
        score = 0;
        return true;
    }
    return false;
};

Enemy.prototype.reset = function () {
    allEnemies.forEach(function (enemy) {
        enemy.y = 83 * Math.floor(Math.random() * 3) + 55;
        enemy.speed = 70 + Math.random() * 80;
    });
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

};

// Update the player's position, required method for game
Player.prototype.update = function (dt) {

    this.outlineCheck();
    // this.win();
};

Player.prototype.reset = function () {
    player.x = 100 * 2;
    player.y = 83 * 3 + 55;
    iswin = false;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    // ctx.restore();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player direction control
Player.prototype.handleInput = function (movement) {
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
};

// Victory checking
Player.prototype.win = function () {

    if (player.y < 55 && iswin === false) {

        score = score + 300;

        iswin = true;
    }

    this.outlineCheck();

    return iswin;
};

// Player's boundary detection
Player.prototype.outlineCheck = function () {
    if (player.x > 402) {
        player.x = 402;
    }

    if (player.x < -2) {
        player.x = -2;
    }

    if (player.y < -28) {
        player.y = -28;
    }

    if (player.y > 387) {
        player.y = 387;
    }

};

// Gem objects
// Player picks for extra points
let Gem = function (x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = ['images/gem-blue.png',
        'images/gem-green.png',
        'images/gem-orange.png'
    ];
};

Gem.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite[this.type]), this.x, this.y);
};

// Impact checking for player and gems
Gem.prototype.checkCollision = function (player) {

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

Gem.prototype.reset = function () {
    allGems.forEach(function (gem) {
        gem.x = 100 * Math.floor(Math.random() * 5);
        gem.y = 83 * Math.floor(Math.random() * 3) + 90;
        gem.type = Math.floor(Math.random() * 3);

    });
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let player = new Player(100 * 2, 83 * 3 + 55);
let allGems = [];
let score = 0;
let iswin = false;

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
            let gem = new Gem(gemInitX, gemInitY, gemIntiType);
            allGems.push(gem);
        }
    };

    createGems();

    // Create an enemy
    let createEnemy = function () {
        let enemyInitY = 83 * Math.floor(Math.random() * 3) + 55;
        let enemy = new Enemy(0, enemyInitY);
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
