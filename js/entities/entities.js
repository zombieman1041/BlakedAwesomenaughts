// TODO
game.PlayerEntity = me.Entity.extend	//builds the player class
({
	init: function(x,y, settings)	//sets up basic function
	{
		this._super(me.Entity, 'init', [x, y, //._super reaches to the object entity 
		{
			image: "player",//uses the image player
			width: 64,	//preserves the height and width for player
			height: 64,
			spritewidth: "64", //uses height and width for player
			spriteheight: "64",
			getShape: function()
			{
				return(new me.Rect(0, 0, 64, 64)) . toPolygon();	//creates a little rectangle for what the player can walk into.
			}
		}]);

		this.body.setVelocity(5, 20); //sets velocity to 5
		this.facing = "right";	//makes the character face right
		this.now= new Date().getTime();	//keeps track of what time it is
		this.lastHit = this.now;	//same as this.now
		this.lastAttack = new Date().getTime();	
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);	//makes camera follow you
		this.renderable.addAnimation("idle", [78]);	//idle animation
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);	//walking animation
		this.renderable.setCurrentAnimation("idle");	//sets the idle animation
		this.renderable.addAnimation("attack", [195, 196, 197, 198, 199, 200], 80);	//setting the attack animation
	},

	update: function(delta){
		this.now = new Date().getTime();	//everytime we call update it updates the time
		if(me.input.isKeyPressed("right")){	//checks to see if the right key is pressed
			this.body.vel.x += this.body.accel.x * me.timer.tick; //adds the velocity to the set velocity and mutiplies by the me.timer.tick and makes the movement smooth
			this.facing = "right";	//sets the character to face right
			this.flipX(false);
		}
		else if(me.input.isKeyPressed("left")){		//allows the player to move left
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(true);	
		}
		else{
			this.body.vel.x = 0;	//stops the movement
		}




		if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){	//allows the player to jump without double jumping or falling and jumping
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}



			if(me.input.isKeyPressed("attack")){	//attack key
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
	// 	if(me.input.isKeyPressed("left")){	//checks to see if the left key is pressed
	// 		this.body.vel.x += this.body.accel.x * me.timer.tick; //adds the velocity to the set velocity and mutiplies by the me.timer.tick and makes the movement smooth
	// 		this.flipX(true);
	// 	}
	// 	else{
	// 		this.body.vel.x = 0;	//stops the movement
	// 	}

	// 	if(this.body.vel.x !== 0){
	// 	if (!this.renderable.isCurrentAnimation("walk")) {
	// 		this.renderable.setCurrentAnimation("walk");
	// 	};			
	// }
	// else{
	// 	this.renderable.setCurrentAnimation("idle");
	// }	

		me.collision.check(this, true, this.collideHandler.bind(this), true);	//checks for collision
		this.body.update(delta);	//delta is the change in time
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){	//sees if the enemy base entitiy is near a player entity and if so it is solid from left and right and top
		 var ydif = this.pos.y - response.b.pos.y;
		 var xdif = this.pos.x - response.b.pos.x;
		if(ydif<-40 && xdif<70 && xdif>-35){
		 	this.body.falling=false;
		 	this.body.vel.y = -1;
		}
		 if(xdif>-35 && this.facing==='right' && (xdif<0)){
		 	this.body.vel.x = 0;
		 	this.pos.x = this.pos.x -1;
		 }else if(xdif<70 && this.facing==='left' && (xdif>0)){
		 	this.body.vel.x=0;
		 	this.pos.x = this.pos.x +1;
		 }

		 if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){	//if the animation is attack it will lose the base health and that it will check when the lasthit was 
		 	
		 	this.lastHit = this.now;
		 	response.b.loseHealth();
		 }
		}
	}
});
game.PlayerBaseEntity = me.Entity.extend({	//creates the player base
	init : function(x, y, settings){
		this._super(me.Entity,'init', [x, y,{
			image: "tower",
			width: 100,
			height: 100,
			spriteheight: "100",
			spritewidth: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)) . toPolygon();
			}
		}])
		this.broken = false;	//atributes to the player base
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){	//if health reaches zero it changes the image to "broken"
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");	
		}
		this.body.update(delta);
		this._super(me.Entity,"update",[delta]);
		return true;
	},
	onCollision: function(){

	}
});

game.EnemyBaseEntity = me.Entity.extend({	//creates the enemy base
	init : function(x, y, settings){
		this._super(me.Entity,'init', [x, y,{
			image: "tower",
			width: 100,
			height: 100,
			spriteheight: "100",
			spritewidth: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)) . toPolygon();
			}
		}])
		this.broken = false;	//atributes of the enemy base
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){		//if health reaches zero image changes to "broken"
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity,"update",[delta]);
		return true;
	},
	onCollision: function(){

	},
	loseHealth: function(){	//makes the health go down
		this.health--;
	}
});
game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity,'init', [x, y, {
			image: "creep1",
			width:32,
			height:64,
			spritewidth:"32",
			spriteheight:"64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = 10;
		this.alwaysUpdate = true;

		this.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	}
})