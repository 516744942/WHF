/*
 var m = new Move();
//让谁动？
m.ele = box;
m.start = XX; //开始位置
m.target =XXX; 结束值
m.direction = "top"; //左右动无需给参数，上下给top
m.animation();  启动动画。
 * */
var fx =[];
function Move(obj,end,direction) {
//	if(fx[obj]) {
//		if(fx[obj].ele === obj) {
//			fx[obj].end = end;
//			return fx[obj];
//		}
//	}
	this.ele = obj;
	this.start = 0;
	this.target = end;
	this.speed = 10;
	this.direction = direction;
	this.animation = function() {
		var o = this;
		if(o.direction == "top") {
			o.offset = "offsetTop";
			o.start  = obj.offsetTop;
		}else{
			o.offset = "offsetLeft";
			o.start  =obj.offsetLeft;
			
		}

		var step,
			i = getTop(o.ele),
			timer,
			current;

		function t() {
			current = getTop(o.ele);
			console.log(current);
			var dx = o.target -current;
			if(dx>0){
				step =Math.ceil((o.target - current) / o.speed);
			}else{
				step =Math.floor((o.target - current) / o.speed);
			}
			
			
			i += step;
			if(Math.abs(i - o.target) < 5) {
				i = o.target;
				clearInterval(timer);
			}
			o.ele.style[o.direction] = i + "px";
		}
		timer = setInterval(t, 20);
		
//		return this;
	}
	this.stop = function(){
		clearInterval(this.timer);
		return this;
	}
//fx[obj] = this;
}

function getTop(obj){
	var css = document.defaultView.getComputedStyle(obj,null);
	return parseInt(css.top);
}
