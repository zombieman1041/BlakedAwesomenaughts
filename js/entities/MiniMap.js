game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 276,
			height: 159,
			spritewidth: 276,	
			spriteheight: 159,
		getShape: function(){
			return (new me.Rect(0, 0, 276, 159)).toPolygon();
		}
	}]);
		this.floating = true;

	}
});