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
		this.health = game.data.playerBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBase";
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){	//if health reaches zero it changes the image to "broken"
		if(this.health<=0){
			this.broken = true;
			game.data.win = false;
			this.renderable.setCurrentAnimation("broken");	
		}
		this.body.update(delta);
		this._super(me.Entity,"update",[delta]);
		return true;
	},

	loseHealth: function(damage){	// makes the player base lose health by creeps
		this.health = this.health-damage;
	},
	onCollision: function(){

	}
});
