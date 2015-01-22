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
	},

	update: function(){

	}
});