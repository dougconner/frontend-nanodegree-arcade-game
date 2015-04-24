'use strict';

// Enemy Class
var Enemy = function() {
  // Variables applied to each instance

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = 606;
};

// Constants for all enemies to inherit
Enemy.prototype.constants = {
  // dx min and max, pixels/sec
  dxMin: 100,
  dxMax: 500,

  // Pixel row positions for aligning the enemy bugs
  row: [63, 146, 229]
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x < 605) {
    this.x = this.x + dt * this.dx;
  } else {
    // reset this.x for another pass, use a random speed and row
    this.dx = getRandomInt(this.constants.dxMin, this.constants.dxMax);
    this.y = this.constants.row[getRandomInt(0,3)];
    // start off-screen left
    this.x = -101;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player Class ***********

var Player = function() {
  // Variables applied to each instance

  // Default image/sprite for our player
  this.sprite = 'images/char-boy.png';

  // player start and reset position
  this.startX = 202;
  this.startY = 322;

  // player pixel movement per keystroke
  this.dx = 101;
  this.dy = 83;

  // Player move limits
  this.limits = {
    'up': 73,
    'down': 405,
    'left': 0,
    'right': 404
  };
};

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

  // Check for collisions with all enemies
  for (var i = 0; i < allEnemies.length; i++) {
    // First check for the same row
    if(Math.abs(this.y - allEnemies[i].y)< 20) {
      // Check for same column
      if(Math.abs(this.x - allEnemies[i].x) < 101) {

        // Selecting a new avatar
        if (player.sprite === 'images/Gem Blue.png') {
          player.sprite = 'images/' + avatarList[this.x / this.dx] + '.png';
          this.reset();
          startGame();

        // Collision with an enemy
        } else {
          game.lost++;
          this.reset();
        }
      }
    }
  }
};

// Draw the layer on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  // Display scoring
  ctx.font = '20px serif';
  ctx.fillText('Wins: ', 20, 40);
  ctx.fillText(game.won, 40, 80);
  ctx.fillText('Score: ', 222, 40);
  ctx.fillText(game.score, 240, 80);
  ctx.fillText('Losses: ', 434, 40);
  ctx.fillText(game.lost, 454, 80);
};

// Keyboard inputs control game function
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      if (this.y > this.limits['up']) {
        this.y -= this.dy;

      // Player reached water
      } else {
        game.won++;
        this.reset();
      }
      break;
    case 'down':
      if (this.y < this.limits['down']) {
        this.y += this.dy;
      }
      break;
    case 'left':
      if (this.x > this.limits['left']) {
        this.x -= this.dx;
      }
      break;
    case 'right':
      if (this.x < this.limits['right']) {
        this.x += this.dx;
      }
      break;
    case 'p':
      // Player selection of avatar
      playerSelect();
      break;
    case 's':
      // Start new game, zero score
      startGame();
      break;
    case '3':
      // 3 enemies
       game.totalEnemies = 3;
      startGame();
      break;
    case '4':
      // 4 enemies
       game.totalEnemies = 4;
      startGame();
      break;
    case '5':
      // 5 enemies
       game.totalEnemies = 5;
      startGame();
      break;
  }
};

Player.prototype.reset = function() {
  this.x = this.startX;
  this.y = this.startY;

  // Compute the new score, block divide-by-zero
  if (game.won + game.lost > 0) {
   game.score = (game.won / (game.won + game.lost)).toPrecision(3);
  }
};

// Avatar list for selecting player avatar
var avatarList =
  [
  'char-boy',
  'char-cat-girl',
  'char-horn-girl',
  'char-pink-girl',
  'char-princess-girl'
  ];

// keep track of game variables
var game = {
  won: 0,
  lost: 0,
  score: 0,
  totalEnemies: 4
};

var playerSelect = function() {
  // stop the game
  allEnemies.length = 0;
  // Use the Gem Blue image as the avatar selector
  player.sprite = 'images/Gem Blue.png';
  // use a loop to instantiate one enemy for each avatar
  for (var i = 0; i < avatarList.length; i++) {
    var enemy = new Enemy();
    // set the enemy.sprite image
    enemy.sprite = 'images/' + avatarList[i] + '.png';
    // set the (x, y) position for each avatar
    enemy.y = enemy.constants.row[1];
    enemy.x = i * 101;
    // set enemy.dx = 0 so avatars won't move
    enemy.dx = 0;
    allEnemies.push(enemy);
  }
  player.reset();
};

var startGame = function() {
  // Remove any existing enemies and generate new ones
  allEnemies.length = 0;
  for (var i = 0; i <  game.totalEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
  }

  // Zero score for a new game
  game.score = 0;
  game.won = 0;
  game.lost = 0;

  // If a player avatar has not been selected use default
  if (player.sprite === 'images/Gem Blue.png') {
    player.sprite = 'images/char-boy.png';
  }
};

// Instantiate enemies and player, start game
var allEnemies = [];
var player = new Player();
player.reset();
startGame();


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    51: '3',    // 3 enemies
    52: '4',    // 4 enemies
    53: '5',    // 5 enemies
    80: 'p',    // player select
    83: 's'     // start game
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

