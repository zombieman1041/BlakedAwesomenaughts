game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");	//loads level 1

		var player = me.pool.pull("player", 0, 420, {});	//loads the player to the map
		me.game.world.addChild(player, 5);	//adds the player to the world

		var gamemanager = me.pool.pull("GameManager", 0, 0, {});	//adds the game manager variable
		me.game.world.addChild(gamemanager, 0);	//adds the game manager to the world

		me.input.bindKey(me.input.KEY.RIGHT, "right"); //sets the key to move right the right arrow
		me.input.bindKey(me.input.KEY.A, "attack");		//binds the key A for attack
		me.input.bindKey(me.input.KEY.SPACE, "jump");	//binds the key space bar for jump	
		me.input.bindKey(me.input.KEY.LEFT, "left"); //sets the key to move left the left arrow
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);


		me.audio.playTrack("cupcakes");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.audio.stopTrack();
	},

	resetPlayer: function(x, y){

		game.data.player = me.pool.pull("player", x, y, {});	//loads the player to the map		
		me.game.world.addChild(game.data.player, 5);	//adds the player to the world		
	}
});
