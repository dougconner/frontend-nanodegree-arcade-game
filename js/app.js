// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 600;
}

// value for all enemies to inherit
Enemy.prototype.constants = {
  // dx min and max pixels/sec
  dxMin: 100,
  dxMax: 500,

  // pixel row positions for aligning the enemy bugs
  row: [63, 146, 229]
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x = (((this.x + 100) + (dt * this.dx)) % 600) - 100;
    if (this.x < 600) {
      this.x = this.x + dt * this.dx;
    } else {
      // reset this.x for another pass, use a random speed and row
      this.dx = getRandomInt(this.constants.dxMin, this.constants.dxMax);
      this.y = this.constants.row[getRandomInt(0,3)];
      this.x = -100

    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


/**** Player *****/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // should just need one instance

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // player start and reset position
    this.startX = 202;
    this.startY = 322;

    // player pixel movement per keystroke
    this.dx = 101;
    this.dy = 83;

    // player move limits
    this.limits = {
      "up": 73,
      "down": 405,
      "left": 0,
      "right": 404
    };
}

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

    // check for collisions with all enemy
    for (var i = 0; i < allEnemies.length; i++) {
      // First check for the same row
      if(Math.abs(this.y - allEnemies[i].y)< 20) {
        // player and enemy in the same row
        if(Math.abs(this.x - allEnemies[i].x) < 100) {
          game.lost++;
          this.reset();
          console.log("collision! lost count = " + game.lost);
        }
      }
    }
}

// Draw the layer on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Keyboard inputs control player motion using this method
// Player move limits prevent movment outside image
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "up":
          if (this.y > this.limits["up"]) {
            this.y -= this.dy;
          } else {
            // Have reached water
            game.won++;
            this.reset();
            console.log("games won = " + game.won);
          }
          break;
        case "down":
          if (this.y < this.limits["down"]) {
            this.y += this.dy;
          }
          break;
        case "left":
          if (this.x > this.limits["left"]) {
            this.x -= this.dx;
          }
          break;
        case "right":
          if (this.x < this.limits["right"]) {
            this.x += this.dx;
          }
          break;
    }
    console.log(this.x + ", " + this.y);
}

Player.prototype.reset = function() {
  this.x = this.startX;
  this.y = this.startY;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// keep track of wins and losses
var game = {
  won: 0,
  lost: 0
}

// instantiate enemies and player
var allEnemies = [];
var totalEnemies = 4;

for (var i = 0; i < totalEnemies; i++) {
  var enemy = new Enemy;
  allEnemies.push(enemy);
}

var player = new Player;

// reset initializes player position
player.reset();


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
