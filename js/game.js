
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		allyCreepHealth: 10,
		allyCreepMoveSpeed: 3,
		allyCreepAttackTimer: 1000,
		enemyBaseHealth: 10,
		playerBaseHealth: 10,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		playerMoveSpeed: 3,
		creepMoveSpeed: 3,
		GameManager: "",
		player: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {	//loads the resolution
		alert("Your browser does not support HTML5 canvas.");	
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.pool.register("player", game.PlayerEntity, true);	//adds the player to the pool to be registered
		me.pool.register("PlayerBase", game.PlayerBaseEntity, true);	//adds the player base to the pool
		me.pool.register("EnemyBase", game.EnemyBaseEntity, true);		//adds the enemy base to the pool
		me.pool.register("EnemyCreep", game.EnemyCreep, true);	//adds the enemy creep to the pool
		me.pool.register("MyCreep", game.MyCreep, true);	
		me.pool.register("GameManager", game.GameManager);	//adds the game manager to the pool		
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.MENU); //allows the game to play
	}
};
