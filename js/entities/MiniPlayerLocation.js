game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this.settings = settings;
		this.r = 5;
		this.diameter = (this.r+2)*2;
		this.anchorPoint = new me.Vector2d(0, 0);
		this.loc = x, y;
		this.settings.width = this.diameter;
		this.settings.height = this.diameter;
		this.settings.spritewidth = this.diameter;
		this.settings = this.diameter;
		this.floating = true;
		this.image = me.video.createCanvas(this.settings.width, this.settings.height);
		var ctx = me.video.renderer.getContext2d(this.image);
		ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 2;

		ctx.arc(this.r + 2, this.r +2, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();

		var my = this;
		this._super(me.Entity, "init", [x, y, {
			width: 14,
			height: 14,
			spritewidth: 14,
			spriteheight: 14,
			getShape: function(){
				return(new me.Rect(0, 0, 14, 14)).toPolygon();
			}
		}])
	},
	draw: function(renderer){
		this._super(me.Entity, "draw", [renderer]);
		this.floating = true;
		renderer.drawImage(
		this.image,
		0, 0, this.width, this.height,
		this.pos.x, this.pos.y, this.width, this.height
		);
	},
	update: function(){
		this.pos.x = (10 +(game.data.pos.x *0.062));
		this.pos.y = (10 +(game.data.pos.y *0.25));
		return true;
	}

})