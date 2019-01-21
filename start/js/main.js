function Hero(game, x, y,){
  //call phaser.sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'hero');
  //this.scale.setTo(0.5,0.5)
  this.anchor.set(0.5, 0.5);
  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  //add animations
  this.animations.add('stop', [8]);
  this.animations.add('run', [9,10,11,12,13,14], 5, true);
  this.animations.add('jump', [4,5], 10);
  this.animations.add('fall', [5,6], 10);
  this.animations.add('attack', [0,1,2,3], 10);
  this.animations.add('win', [3,5,1,7,6,4,2], 10, true);
}
// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
//move function
Hero.prototype.move = function (direction) {
  const SPEED = 200;
  this.body.velocity.x = direction * SPEED;
  if(this.body.velocity.x < 0){
    this.scale.x = -1.6;
  }
  else if (this.body.velocity.x > 0){
    this.scale.x = 1.6;
  }
};
//jump function
Hero.prototype.jump = function(){
  const JUMP_SPEED = 600;
    let canJump = this.body.touching.down;
    if (canJump) {
        this.body.velocity.y = -JUMP_SPEED;
    }
    return canJump;
}
//bounce function
Hero.prototype.bounce = function(){
  const BOUNCE_SPEED = 200;
  this.body.velocity.y = -BOUNCE_SPEED;
}
//animation function
Hero.prototype._getAnimationName = function(){
  let name = 'stop';
  if(this.body.velocity.y < 0){
    name = 'jump';
  }
  else if(this.body.velocity.y >= 0 && !this.body.touching.down) {
    name = 'fall';
  }
  else if(this.body.velocity.x !== 0 && this.body.touching.down) {
    name = 'run';
  }
  else if(this.spacePressed && this.body.touching.down){
    name = 'attack';
    this.game.time.events.add(500, function(){
      this.spacePressed = false;
    }, this);
  }
  else if(this.level == 4){
    console.log('test');
  }
  return name;
}
//attack function
Hero.prototype.attack = function(){
    this.spacePressed = true;
  //this.animations.add('attack', [0,1,2,3], 10);
  //this.animations.play('jump');
}
//hero update function
Hero.prototype.update = function(){
  let animationName = this._getAnimationName();
    if(this.animations.name !== animationName){
      this.animations.play(animationName);
    }
}
//skeleton stuff
function Skeleton(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'skeleton');
  this.anchor.set(0.5);
  this.scale.setTo(1.5, 1.5);
  this.animations.add('crawl', [15,16,17,18,19,20,21,22,23,24,25,26], 15, true);
  this.animations.add('die', [0,1,2,3,4,5,6,7,8,9,10,11], 10);
  this.animations.play('crawl');
  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.x = Skeleton.SPEED;
}
//create skeleton
Skeleton.SPEED = 100;
Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor = Skeleton;
//update function
Skeleton.prototype.update = function () {
  // check against walls and reverse direction if necessary
  if (this.body.touching.right || this.body.blocked.right) {
      this.body.velocity.x = -Skeleton.SPEED; // turn left
      this.scale.x = -1.5;
  }
  else if (this.body.touching.left || this.body.blocked.left) {
      this.body.velocity.x = Skeleton.SPEED; // turn right
      this.scale.x = 1.5;
  }
};
//die function
Skeleton.prototype.die = function(){
  this.body.enable = false;
  this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
}
//start playstate
PlayState = {};
const LEVELS = 5;
PlayState.init = function(data){
  this.game.renderer.renderSession.roundPixels = true;
  this.keys = this.game.input.keyboard.addKeys({
    a:Phaser.KeyCode.A,
    d:Phaser.KeyCode.D,
    w:Phaser.KeyCode.W,
    space:Phaser.KeyCode.SPACEBAR
  })
  this.keys.space.onDown.add(function(){
    //console.log('attack');
    this.hero.attack();
  }, this)
  this.keys.w.onDown.add(function () {
      let didJump = this.hero.jump();
      if (didJump) {
          this.sfx.jump.play();
      }
  }, this);
  this.coinCount = 0;
  this.hasKey = false;
  this.spacePressed = false;
  this.level = (data.level || 0) % LEVELS;
  if(this.level == 0){
    alertify.alert('Level 1: Use W, A, and D to move. Jump on the skeletons or use the spacebar to attack. Complete the level by collecting the key and returning to the door.');
  }
  if(this.level == 1){
    alertify.alert('Level 2')
  }
  if(this.level == 2){
    alertify.alert('Level 3')
  }
  if(this.level == 3){
    alertify.alert('Level 4')
  }
}
PlayState.preload = function(){
  //level 0
  this.game.load.json('level:0', 'data/level00.json');
  //load in background
  this.game.load.image('background', 'images/bground.png');
  //level data
  this.game.load.json('level:1', 'data/level01.json');
  this.game.load.json('level:2', 'data/level02.json');
  this.game.load.json('level:3', 'data/level03.json');
  this.game.load.json('level:4', 'data/level04.json');
  //level platforms
  this.game.load.image('ground', 'images/ground.png')
  this.game.load.image('grass:8x1', 'images/grass_8x1.png');
  this.game.load.image('grass:6x1', 'images/grass_6x1.png');
  this.game.load.image('grass:4x1', 'images/grass_4x1.png');
  this.game.load.image('grass:2x1', 'images/grass_2x1.png');
  this.game.load.image('grass:1x1', 'images/grass_1x1.png');
  this.game.load.image('invisible-wall', 'images/invisible_wall.png');
  //load hero
  //this.game.load.image('hero', 'character/idle.png')
  this.game.load.spritesheet('hero', 'character/fixedhero.png', 37, 37);
  //sounds
  this.game.load.audio('sfx:jump', 'audio/jump.wav');
  this.game.load.audio('sfx:coin', 'audio/coin.wav');
  this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
  this.game.load.audio('sfx:key', 'audio/key.wav');
  this.game.load.audio('sfx:door', 'audio/door.wav');
  //load coins
  this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
  //load skeletons
  this.game.load.spritesheet('skeleton', 'character/fullss.png', 37, 32);
  this.game.load.spritesheet('death', 'character/dead.png', 33, 32);
  //load scoreboard
  this.game.load.image('icon:coin', 'images/coin_icon.png');
  this.game.load.image('font:numbers', 'images/numbers.png');
  //load door
  this.game.load.spritesheet('door', 'images/door.png', 42, 66);
  //load key
  this.game.load.image('key', 'images/key.png');
  this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);

}

PlayState.create = function(){
  //sounds stuff
  this.sfx = {
    jump: this.game.add.audio('sfx:jump'),
    coin: this.game.add.audio('sfx:coin'),
    stomp: this.game.add.audio('sfx:stomp'),
    key: this.game.add.audio('sfx:key'),
    door: this.game.add.audio('sfx:door')
  }
  this.sfx.jump.volume = 0.03;
  this.sfx.coin.volume = 0.05;
  this.sfx.stomp.volume = 0.1;
  this.sfx.key.volume = 0.1;
  this.sfx.door.volume = 0.1;
  bground = this.game.add.image(0, 0, 'background')
  //bground.scale.setTo(0.5, 0.5);
  //this._loadlevel(this.game.cache.getJSON('level:1'));
  this._loadlevel(this.game.cache.getJSON(`level:${this.level}`));
  this._createHud();
  //text stuff
  //var style = { font: "32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  //text = this.game.add.text(500, 100, 'test', 'style');
  //text.setTextBounds(0, 100, 800, 100);
}

PlayState.update = function(){
  this._handleCollisions();
  this._handleInput();
  this.coinFont.text = `x${this.coinCount}`;
  this.keyIcon.frame = this.hasKey ? 1 : 0;
}

PlayState._handleCollisions = function () {
    this.game.physics.arcade.collide(this.hero, this.platforms);
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin,
        null, this);
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
    this.game.physics.arcade.overlap(this.hero, this.spiders,
        this._onHeroVsEnemy, null, this);
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey, null, this);

    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,
       // ignore if there is no key or the player is on air
      function (hero, door){
         return this.hasKey && hero.body.touching.down && this.coinCount > 3;
      }, this);
};

PlayState._handleInput = function () {
    if (this.keys.a.isDown) { // move hero left
        this.hero.move(-1);
    }
    else if (this.keys.d.isDown) { // move hero right
        this.hero.move(1);
    }
    else{
      this.hero.move(0);
    }
}
PlayState._loadlevel = function(data){
  this.bgDecoration = this.game.add.group();
  //create groups/layers
  this.platforms = this.game.add.group();
  this.coins = this.game.add.group();
  this.spiders = this.game.add.group();
  this.enemyWalls = this.game.add.group();
  this.enemyWalls.visible = false;
  //spawn platforms
  data.platforms.forEach(this._spawnPlatform, this);
  //spawn Hero
  this._spawnCharacters({hero:data.hero, spiders:data.spiders});
  data.coins.forEach(this._spawnCoin, this);
  this._spawnDoor(data.door.x, data.door.y);
  this._spawnKey(data.key.x, data.key.y);
  //enable gravity
  const GRAVITY = 1200;
  this.game.physics.arcade.gravity.y = GRAVITY;
}

PlayState._spawnDoor = function (x, y) {
  this.door = this.bgDecoration.create(x, y, 'door');
  this.door.anchor.setTo(0.5, 1);
  this.game.physics.enable(this.door);
  this.door.body.allowGravity = false;
};

PlayState._spawnPlatform = function(platform){
  let sprite = this.platforms.create(
        platform.x, platform.y, platform.image);
  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;
  this._spawnEnemyWall(platform.x, platform.y, 'left');
  this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
}

PlayState._spawnCharacters = function(data){
  // spawn hero
  this.hero = new Hero(this.game, data.hero.x, data.hero.y);
  this.hero.scale.setTo(1.6, 1.7);
  this.game.add.existing(this.hero);
  data.spiders.forEach(function (spider) {
    let sprite = new Skeleton(this.game, spider.x, spider.y);
    this.spiders.add(sprite);
  }, this);
}

PlayState._spawnCoin = function(coin){
  let sprite = this.coins.create(coin.x, coin.y, 'coin');
  sprite.anchor.set(0.5, 0.5);
  sprite.animations.add('rotate', [0, 1, 2, 1], 6, true); // 6fps, looped
  sprite.animations.play('rotate');
  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
}
PlayState._spawnKey = function(x, y){
  this.key = this.bgDecoration.create(x, y, 'key');
  this.key.anchor.set(0.5, 0.5);
  this.game.physics.enable(this.key);
  this.key.body.allowGravity = false;
  this.key.y -= 3;
  this.game.add.tween(this.key)
    .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
    .yoyo(true)
    .loop()
    .start();
}

PlayState._spawnEnemyWall = function (x, y, side) {
  let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
  // anchor and y displacement
  sprite.anchor.set(side === 'left' ? 1 : 0, 1);
  // physic properties
  this.game.physics.enable(sprite);
  sprite.body.immovable = true;
  sprite.body.allowGravity = false;
};

PlayState._onHeroVsEnemy = function(hero, enemy){
  if(hero.body.velocity.y > 0){
    hero.bounce();
    //enemy.kill();
    enemy.die();
    this.sfx.stomp.play();
  }
  else if(this.keys.space.isDown){
    enemy.die();
    //console.log('desd')
    this.sfx.stomp.play();
  }
  else{
    this.sfx.stomp.play();
    this.game.state.restart();
    this.game.state.restart(true, false, { level: this.level});
  }
}

PlayState._onHeroVsCoin = function(hero, coin){
  this.sfx.coin.play();
  coin.kill();
  this.coinCount++;
  // console.log(this.coinCount)
}

PlayState._onHeroVsKey = function(hero, key){
  this.sfx.key.play();
  key.kill();
  this.hasKey = true;
}
PlayState._onHeroVsDoor = function(hero, door){
  this.sfx.door.play();
  //this.game.state.restart();
  if(this.level == 3){
    alertify.alert("Congratulations, you've beaten the game!");

    this.game.state.restart(true, false, { level: this.level + 1 });
  }
  else{
    this.game.state.restart(true, false, { level: this.level + 1 });
  }
}

PlayState._createHud = function () {
    this.keyIcon = this.game.make.image(0, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);
    const NUMBERS_STR = '0123456789X ';
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26,
        NUMBERS_STR);
    let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width,
        coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);
    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.add(coinScoreImg);
    this.hud.add(this.keyIcon);
    this.hud.position.set(10, 10);
};

window.onload = function(){
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play', true, false, {level:0});
}
