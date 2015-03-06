game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		me.audio.playTrack("dragons");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "black");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "New Game", this.pos.x, this.pos.y);

			},
			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);
			}
		})));

			me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				this.font = new me.Font("Arial", 46, "black");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Continue", this.pos.x, this.pos.y);

			},
			update: function(dt){
				return true;
			},

			newGame: function(){
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp2 = me.save.exp2;
				game.data.exp3 = me.save.exp3;
				game.data.exp4 = me.save.exp4;
				me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});
				me.input.releasePointerEvent('pointerdown', this);
				
				me.state.change(me.state.SPENDEXP);

			}
		})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

		me.audio.stopTrack("dragons");
	}
});
