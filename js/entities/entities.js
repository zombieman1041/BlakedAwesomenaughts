// TODO
game.PlayerEntity = me.Entity.extend	//builds the player class
({
	init: function(x, y, settings){//sets up basic function
		this.setSuper(x, y);
		this.setPlayerTimer();
		this.setAttributes();
		this.type="PlayerEntity";
		this.setFlags();
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);	//makes camera follow you
		this.addAnimation();
		this.renderable.setCurrentAnimation("idle");	//sets the idle animation	
	},

	setSuper: function(x, y){
		this._super(me.Entity, 'init', [x, y, {//._super reaches to the object entity 
		image: "player",//uses the image player
		width: 64,	//preserves the height and width for player
		height: 64,
		spritewidth: "64", //uses height and width for player
		spriteheight: "64",
		getShape: function(){
			return(new me.Rect(0, 0, 64, 64)) . toPolygon();	//creates a little rectangle for what the player can walk into.
		}
	}]);
	},
	setPlayerTimer: function(){
		this.now = new Date().getTime();	//keeps track of what time it is
		this.lastHit = this.now;	//same as this.now
		this.lastSpear = this.now;
		this.lastAttack = new Date().getTime();	

	},
	setAttributes: function(){
		this.health = game.data.playerHealth;		
		this.body.setVelocity(game.data.playerMoveSpeed, 20); //sets velocity to 5	
		this.attack = game.data.playerAttack;	
	},
	setFlags: function(){
		this.facing = "right";	//makes the character face right
		
		this.dead = false;	
		this.attacking = false;
	},
	addAnimation: function(){
		this.renderable.addAnimation("idle", [78]);	//idle animation
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);	//walking animation		
		this.renderable.addAnimation("attack", [195, 196, 197, 198, 199, 200], 80);	//setting the attack animation		
	},
	update: function(delta){
		this.now = new Date().getTime();	//everytime we call update it updates the time
		this.dead = this.checkIfDead();
		this.checkKeyPressesAndMove();
		this.checkAbilityKeys();
		this.setAnimation();
		me.collision.check(this, true, this.collideHandler.bind(this), true);	//checks for collision
		this.body.update(delta);	//delta is the change in time
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function(){
		if (this.health <= 0){
			return true;
		}		
	},

	checkKeyPressesAndMove: function(){
		if(me.input.isKeyPressed("right")){	//checks to see if the right key is pressed
			this.moveRight();
		}
		else if(me.input.isKeyPressed("left")){		//allows the player to move left
			this.moveLeft();
		}
		else{
			this.body.vel.x = 0;	//stops the movement
		}

		if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){	//allows the player to jump without double jumping or falling and jumping
			this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack");	//attack key		
	},

	moveRight: function(){
		this.body.vel.x += this.body.accel.x * me.timer.tick; //adds the velocity to the set velocity and mutiplies by the me.timer.tick and makes the movement smooth
		this.facing = "right";	//sets the character to face right
		this.flipX(false);
	},
	moveLeft: function(){
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		this.facing = "left";
		this.flipX(true);			
		},
	jump: function(){
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},

	checkAbilityKeys: function(){
		if(me.input.isKeyPressed("skill1")){
			// this.speedBurst();
		}else if(me.input.isKeyPressed("skill2")){
			// this.eatCreep();
		}else if(me.input.isKeyPressed("skill3")){
			this.throwSpear();
		}
	},
	throwSpear: function(){
		if(this.now-this.lastSpear >= game.data.spearTimer*1000 && game.data.ability3 > 0){
			this.lastSpear = this.now;
		var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
		me.game.world.addChild(spear, 10);
		}
		
	},

	setAnimation: function(){
		if(this.attacking){
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle");
				this.renderable.setAnimationFrame();
			}
		}
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){ //changes the animation from attack to walking
			if (!this.renderable.isCurrentAnimation("walk")) {	//sets the current animation for walk
				this.renderable.setCurrentAnimation("walk");
			};			
		}
		else if(!this.renderable.isCurrentAnimation("attack")){	//changes the animation from attack to idle
			this.renderable.setCurrentAnimation("idle");	//if the player is not walking it uses idle animation
		}
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){	//sees if the enemy base entitiy is near a player entity and if so it is solid from left and right and top
		this.collideWithEnemyBase(response);
		}

		else if(response.b.type==='EnemyCreep'){
			this.collideWithEnemyCreep(response);
		}
	},
	collideWithEnemyBase: function(response){
		var ydif = this.pos.y - response.b.pos.y;
		var xdif = this.pos.x - response.b.pos.x;
		if(ydif<-40 && xdif<70 && xdif>-35){
		 	this.body.falling=false;
		 	this.body.vel.y = -1;
		}
		 if(xdif>-35 && this.facing==='right' && (xdif<0)){
		 	this.body.vel.x = 0;
		 	//this.pos.x = this.pos.x -1;
		 }
		 else if(xdif<70 && this.facing==='left' && (xdif>0)){
		 	this.body.vel.x=0;
		 	//this.pos.x = this.pos.x +1;
		 }

		 if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){	//if the animation is attack it will lose the base health and that it will check when the lasthit was 
		 		this.lastHit = this.now;
		 		response.b.loseHealth(game.data.playerAttack);
		 	}
		
	},
	collideWithEnemyCreep: function(response){
		var xdif = this.pos.x - response.b.pos.x;
		var ydif = this.pos.y - response.b.pos.y;

		this.stopMovement(xdif);

		if(this.checkAttack(xdif, ydif)){
			this.hitCreep(response);		 	
		};

	},

	stopMovement: function(xdif){
		if(xdif > 0){
			//this.pos.x = this.pos.x + 1;
			if (this.facing === "left"){
				this.body.vel.x = 0;
			}
		}
		else{
			//this.pos.x = this.pos.x - 1;
			if(this.facing === "right"){
				this.body.vel.x = 0;
			}
		}
	},
	checkAttack: function(xdif, ydif){
		if(this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
			&& (Math.abs(ydif) <=40) && 
			((xdif>0) && this.facing==="left") || (((xdif<0) && this.facing === "right"))){
			this.lastHit = this.now;
			return true;
		}
			return false;
	},
	hitCreep: function(response){
		 	if(response.b.health <= game.data.playerAttack){
		 		game.data.gold += 1;
		 	}
		 	response.b.loseHealth(game.data.playerAttack);		
	}
});



//intermeidiae challenge creating an ally creep
game.MyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep2",
			width: 100,
			height:85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return (new me.Rect(0, 0, 52, 100)).toPolygon();	
			}
		}]);
		
		 this.health = game.data.allyCreepHealth;
		 this.alwaysUpdate = true;
		// //this.attacking lets us know if the enemy is currently attacking
		 this.attacking = false;
		// //keeps track of when our creep last attacked anyting
		 this.lastAttacking = new Date().getTime();
		 this.lastHit = new Date().getTime();
		 this.now = new Date().getTime();

		this.body.setVelocity(game.data.allyCreepMoveSpeed, 20);

		this.type = "MyCreep";

		this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	update: function(delta) {
		// this.now = new Date().getTime();
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		this.flipX(true);
		
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;

		},
	

	collideHandler: function(response)	{
		if(response.b.type==='EnemyBaseEntity'){
			this.attacking = true;
			//this.lastAttacking = this.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x +1;
			//checks that it has been at least 1 second since this creep hit a base
			if((this.now-this.lastHit <= game.data.allyCreepAttackTimer)){
				//updates the last hit timer
				this.lastHit = this.now;
				//makes the player base call its loseHealth	function and passes it a damage of 1
				response.b.loseHealth(1);
			 }
			}
		}
	});

	// end of challenge


// 	update: function(delta){
// 		this.now = new Date() . getTime();	//creates a timer
// 		this.body.vel.x -= this.body.accel.x * me.timer.tick;	//causes creeps to move
// 		me.collision.check(this, true, this.collideHandler.bind(this), true);	//checks for collisions
// 		this.body.update(delta);	//causes the creep to fall to the ground
// 		this._super(me.Entity,"update", [delta]);
// 		return true;
// 	},
// 	collideHandler: function(response){
// 		if(response.b.type==='PlayerBase'){	//checks if there is a player base
// 			this.attacking=true;
// 			//this.lastAttacking=this.now;
// 			this.body.vel.x=0;
// 			this.pos.x = this.pos.x + 1;	//makes the creep keep moving
// 			if((this.now-this.lastHit >= 1000)){	//attacks the base every second
// 				this.lastHit = this.now;	//updates the last hit timer
// 				response.b.loseHealth(1);	//calls the lose health function which loses the health with a damage of 1
// 			}
// 		}else if(response.b.type==='PlayerEntity'){
// 			var xdif = this.pos.x - response.b.pos.x;
// 			this.attacking=true;
// 			//this.lastAttacking=this.now;
			
// 			if(xdif>0){
// 				this.pos.x = this.pos.x + 1;	//makes the creep keep moving
// 				this.body.vel.x=0;
// 			}
			
// 			if(this.now-this.lastHit >= 700 && xdif>0){	//attacks the player every second
// 				this.lastHit = this.now;	//updates the last hit timer
// 				response.b.loseHealth(1);	//calls the lose health function which loses the health with a damage of 1
// 			}			
// 		}
// 	}
// });

