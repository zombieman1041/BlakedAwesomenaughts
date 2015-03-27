game.GameTimerManager = Object.extend({	//creates a game manager to manage the timer
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.pause = false;
		this.alwaysUpdate = true;
	},

	update: function(){	//creates new creeps
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
		return true;
	},

	goldTimerCheck: function(){
		if (Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += game.data.exp1+1;
		}
	},
	creepTimerCheck: function(){
		if (Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);

			var creepe2 = me.pool.pull("MyCreep", 100, 0, {});
			me.game.world.addChild(creepe2, 5);
		}
	}
});