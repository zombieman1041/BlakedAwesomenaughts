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

		this.body.setVelocity(5, 0); //sets velocity to 5
	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){	//checks to see if the right key is pressed
			this.body.vel.x += this.body.accel.x * me.timer.tick; //adds the velocity to the set velocity and mutiplies by the me.timer.tick and makes the movement smooth
		}
		else{
			this.body.vel.x = 0;	//stops the movement
		}

		this.body.update(delta);	//delta is the change in time
		return true;
	}
});