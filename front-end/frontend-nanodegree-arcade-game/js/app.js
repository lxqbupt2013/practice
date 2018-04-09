// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    this.outlineCheck();

};

// Enemy's boundary detection
Enemy.prototype.outlineCheck = function(x, y, speed) {
    if(this.x > 402) {
        this.x = -10;
        // Recharge random speed to simulate new enemy
        this.speed = speed || (70 + Math.random() * 80);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Impact checking for player and emeny
Enemy.prototype.checkCollision = function(player) {
    var y_check = (this.y - player.y < 40 ) && (this.y - player.y > -40);
    var x_check = (this.x - player.x < 50 ) && (this.x - player.x > -50);
    if(y_check && x_check) {
        player.reset();
        score = 0;
        return true;
    }
    else {
        return false;
    }
}

Enemy.prototype.reset = function() {
    allEnemies.forEach(function(enemy) {
        enemy.y = 83 * Math.floor(Math.random() * 3) + 55;
        enemy.speed = 70 + Math.random() * 80;
    });
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

};


// Update the player's position, required method for game
Player.prototype.update = function(dt) {

    this.outlineCheck();
    // this.win();
};


Player.prototype.reset = function() {
    player.x = 100 * 2;
    player.y = 83 * 3 + 55;
    iswin = false;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    // ctx.restore();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player direction control
Player.prototype.handleInput = function (movement) {
    switch (movement) {
        case 'left': this.x -= 101; break;
        case 'right': this.x += 101; break;
        case 'up': this.y -= 83; break;
        case 'down': this.y += 83; break;
    }
}

// Victory checking
Player.prototype.win = function() {

    if(player.y < 55 && iswin === false) {

        score = score + 300;

        iswin = true;
    }

    this.outlineCheck();

    return iswin;
}

// Player's boundary detection
Player.prototype.outlineCheck = function() {
    if(player.x > 402) {
        player.x = 402;
    }
    if(player.x < -2) {
        player.x = -2;
    }
    if(player.y < -28) {
        player.y = -28;
    }
    if(player.y > 387) {
        player.y = 387;
    }
}

// Gem objects
// Player picks for extra points
var Gem = function(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = ['images/gem-blue.png',
                   'images/gem-green.png',
                   'images/gem-orange.png'
                ];
}


Gem.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite[this.type]), this.x, this.y);    
}

// Impact checking for player and gems
Gem.prototype.checkCollision = function(player) {

    var y_check = (this.y - player.y < 38 ) && (this.y - player.y > -38 );
    var x_check = (this.x - player.x < 5 ) && (this.x - player.x > -5);

    if(y_check && x_check) {
        if(this.type === 0) {
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
    else {
        return false;
    }
}

Gem.prototype.reset = function() {
    allGems.forEach(function(gem) {
        gem.x = 100 * Math.floor(Math.random() * 5);
        gem.y = 83 * Math.floor(Math.random() * 3) + 90;
        gem.type = Math.floor(Math.random() * 3);

    });
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(100 * 2, 83 * 3 + 55);
var allGems = [];
var score = 0;
var iswin = false;


window.onload = function() {

    // Random enemy number between 3 and 6
    var enemy_num = 3 + Math.floor(Math.random()* 3);
    
    var enemy_create__dt = -1;


    var createGems = function() {
        // Random gem number between 1 and 3
        var gems_num = 1 + Math.floor(Math.random()* 2);

        for(var i = 0; i <= gems_num; i++) {
            var gem_init_x = 100 * Math.floor(Math.random() * 5);
            var gem_init_y = 83 * Math.floor(Math.random() * 3) + 90;
            var gem_inti_type = Math.floor(Math.random() * 3);
            var gem = new Gem(gem_init_x, gem_init_y, gem_inti_type);
            allGems.push(gem);
        }
     }

     createGems();

    // Create an enemy
    var createEnemy = function() {
        var enemy_init_y = 83 * Math.floor(Math.random() * 3) + 55;
        var enemy = new Enemy(0, enemy_init_y);
        return enemy;
    }

    // Create enemies in order
    var creatEnemies = setInterval(function() {
        allEnemies.push(createEnemy());
        enemy_create__dt ++;
        if(enemy_create__dt == enemy_num) {
            clearInterval(creatEnemies)
        }
    }, 500);

};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});