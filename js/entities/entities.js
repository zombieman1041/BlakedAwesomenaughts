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
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);	//makes camera follow you
		this.renderable.addAnimation("idle", [78]);	//idle animation
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);	//walking animation
		this.renderable.setCurrentAnimation("idle");	//sets the idle animation
		this.renderable.addAnimation("attack", [195, 196, 197, 198, 199, 200], 80);	//setting the attack animation
	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){	//checks to see if the right key is pressed
			this.body.vel.x += this.body.accel.x * me.timer.tick; //adds the velocity to the set velocity and mutiplies by the me.timer.tick and makes the movement smooth
			this.flipX(false);
		}
		else{
			this.body.vel.x = 0;	//stops the movement
		}
	if(me.input.isKeyPressed("attack")){	//attack key
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle");
				this.renderable.setAnimationFrame();
			}
		}
		
		else if(this.body.vel.x !== 0){
		if (!this.renderable.isCurrentAnimation("walk")) {	//sets the current animation for walk
			this.renderable.setCurrentAnimation("walk");
		};			
	}
	else{
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
	if(me.input.isKeyPressed("attack")){	//animations for attack
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle");
				this.renderable.setAnimationFrame();
			}
		}
		this.body.update(delta);	//delta is the change in time
		this._super(me.Entity, "update", [delta]);
		return true;
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
				return (new me.Rect(0, 0, 100, 100)) . toPolygon();
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
				return (new me.Rect(0, 0, 100, 100)) . toPolygon();
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

	}
});
