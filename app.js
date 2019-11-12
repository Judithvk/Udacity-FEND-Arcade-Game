// Enemies our player must avoid
let allEnemies = [];

//function for enemy takes x and y coordinates and speed as arguments
const Enemy = function(x, y, s) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position,
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -100;
    }
    //makes sure collisions happen at the right time
    let enemyXLeftMax = this.x - 70;
    let enemyXRightMax = this.x + 70;
    let enemyYTopMax = this.y - 60;
    let enemyYBottomMax = this.y + 60;
    //if collision happens, player gets reset
    if (player.x > enemyXLeftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax){
      player.resetPosition();
    }
};

// Draws enemy on screen
Enemy.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
const Player = function (x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 404;
  this.h_step = 101;
  this.v_step = 83;
};

//draws player on screen
Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//puts player back to starting position when collision or win happens
Player.prototype.resetPosition = function () {
  this.x = 202;
  this.y = 404;
};

//handles input from user
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    //moves player in direction indicated by pressing arrow keys
    case 'left':
      this.x >= this.h_step ? this.x -= this.h_step : this.x -= 0;
      break;
    case 'right':
      this.x < (this.h_step * 4) ? this.x += this.h_step : this.x += 0;
      break;
    case 'down':
      this.y <= (this.v_step * 5) ? this.y += this.v_step : this.y += 0;
      break;
    case 'up':
      this.y -= this.v_step;
      //handles win
      if(this.y <= 50) {
        window.alert("yay. you won!")
        this.resetPosition();
      }
    }
};

//instantiates your objects.
var enemy1 = new Enemy (-150, 60, (Math.floor(Math.random() * 200) + 180));
var enemy2 = new Enemy (-100, 140, (Math.floor(Math.random() * 280) + 180));
var enemy3 = new Enemy (30, 220, (Math.floor(Math.random() * 300) + 180));

//enemy objects in an array
allEnemies = [enemy1, enemy2, enemy3];

//player object
window.player = new Player(200, 390);

//listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (allowedKeys[e.keyCode]) {
      player.handleInput(allowedKeys[e.keyCode]);
    }
});
