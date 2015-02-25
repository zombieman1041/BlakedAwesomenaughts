game.EnemyCreep = me.Entity.extend({	//creates the enemy creeps
	init: function(x, y, settings){
		this._super(me.Entity,'init', [x, y, {	//creates the creeps size and image
			image: "creep1",
			width:32,
			height:64,
			spritewidth:"32",
			spriteheight:"64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = game.data.enemyCreepHealth;	//sets up the attributes 
		this.alwaysUpdate = true;
		this.attacking = false;	//lets us know when the enemy is attacking
		this.lastAttacking = new Date().getTime();	//lets us know when the enemy last attacked
		this.lastHit = new Date().getTime();	//keeps track on the last time the enemy hit anything
		this.now = new Date().getTime();	//creates a timer
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);	//sets up the animations for walk
		this.renderable.setCurrentAnimation("walk");
	},

		loseHealth: function(damage){
			this.health = this.health - damage;
		},

	update: function(delta){
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}
		this.now = new Date() . getTime();	//creates a timer
		this.body.vel.x -= this.body.accel.x * me.timer.tick;	//causes creeps to move
		this.flipX(true);
		me.collision.check(this, true, this.collideHandler.bind(this), true);	//checks for collisions
		this.body.update(delta);	//causes the creep to fall to the ground
		this._super(me.Entity,"update", [delta]);
		return true;
	},

		collideHandler: function(response)	{
		if(response.b.type==='PlayerBase'){
			this.attacking = true;
			
			this.lastAttacking = this.now;
			
			this.body.vel.x = 0;
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x +1;
			//checks that it has been at least 1 second since this creep hit a base
			if((this.now - this.lastHit >= 1000)){
				//updates the last hit timer
				this.lastHit = this.now;
				//makes the player base call its loseHealth	function and passes it a damage of 1
				response.b.loseHealth(1);
			}
		}
		else if (response.b.type === 'PlayerEntity'){
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking = true;
			//this.lastAttacking = this.now;

			if (xdif > 0){
				this.pos.x = this.pos.x + 1;
				this.body.vel.x = 0;
			}

			if (this.now - this.lastHit >= game.data.enemyCreepAttackTimer && xdif > 0){
				this.lastHit = this.now;

				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}
	}
});
