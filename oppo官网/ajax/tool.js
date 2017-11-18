//高级水平。
//jQuery 的开发，动画队列。数组
var fx = [];
//相对定位动画

function MoveR(obj, end) {
	if(fx[obj]) {
		if(fx[obj].ele === obj) {
			fx[obj].end = end;
			return fx[obj];
		}
	}
	this.timer = 0;
	this.ele = obj;
	this.end = end;
	this.animation = function() {

		var o = this;
		var step,
			current = getTop(o.ele);
		//console.log("s " + current　 + " tar " + o.end);

		function temp() {
			current = getTop(o.ele);
			//console.log("current" + current);
			var dx = o.end - current;
			if(dx > 0) {
				step = Math.ceil((o.end - current) / 5)
			} else {
				step = Math.floor((o.end - current) / 5)
			}

			//console.log("o.end " + o.end)
			//console.log("step " + step);
			current += step;
			if(Math.abs(current - o.end) < 2) {
				current = o.end;
				clearInterval(o.timer)
			}
			o.ele.style.top = current + "px";
		}
		o.timer = setInterval(temp, 100);

		return this;
	}

	this.stop = function() {
		clearInterval(this.timer);
		return this;
	}
	fx[obj] = this;
}

//获取元素的CSS属性
function getTop(obj) {
	var css = document.defaultView.getComputedStyle(obj, null);
	return parseInt(css.top);
}

//获取宽度
function getWidth(obj) {
	var css = document.defaultView.getComputedStyle(obj, null);
	return parseInt(css.width);
}


//进度条动画
function pg() {
	progress1.style.width = "0px";
	var obj = progress1;
	var start = 0;
	var end = 1180;
	var current = 0;
	var timer = 0;
	function T() {
		current = getWidth(obj);
//		var dx = end - current ;
		step = Math.ceil((end - current) / 5)
		current += step;
		if(Math.abs(current - end) < 2) {
			current =end;
			clearInterval(timer) ;
			/*
			 通知 当前幻灯片移除画面 
			 * */
			ob.notice()
		}
		obj.style.width = current + "px";
	}
	timer = setInterval(T,100);
}

/*
 var m = new Move();
//让谁动？
m.ele = box;
m.start = XX; //开始位置
m.target =XXX; 结束值
m.direction = "top"; //左右动无需给参数，上下给top
m.animation();  启动动画。
 * */
function Move(obj, start, end, direction) {

	this.ele = obj;
	this.target = end;
	this.speed = 10;
	this.start = start;
	this.direction = direction ? "top" : "left";
	this.animation = function(callBack) {
		var o = this;
		if(o.direction == "top") {
			o.offset = "offsetTop"
			o.start = (o.start == -1) ? obj.offsetTop : o.start

		} else {
			o.offset = "offsetLeft";
			o.start = (o.start == -1) ? obj.offsetLeft : o.start

		}

		var step,
			i = o.start,
			timer,
			current;

		function t() {

			current = o.ele[o.offset];
//			console.log(current)
			step = (o.target - current) / o.speed
			step = Math.ceil(step);
			i += step;
			if(Math.abs(i - o.target) < 3) {
				i = o.target;
				clearInterval(timer);
				if(callBack) {
					callBack();
				}
			}
			o.ele.style[o.direction] = i + "px";
		}
		timer = setInterval(t, 100);
	}

}

//观察者模式。
var ob = {
	lis: [],
	notice: function() {
		var next = ob.lis.shift();
		if(next) {
			next();
		} else {
			ob.lis = [pg, M1Out, M2In, pg, M2Out, M3In, pg, M3Out, M1In]
			ob.start()
		}
	},
	start: function() {
		this.notice();
	}
}
//小圆点

//背景消失动画
function fadeOut(obj, callBack) {
	var i = 100;
	var j = 0;
	var timer = 0;

	function t() {
		i -= 5;
		if(i < 10) {
			i = 0;
			clearInterval(timer)
			if(callBack) {
				callBack();
			}
		}
		j = i / 100;
		obj.style.opacity = j;
	}
	timer = setInterval(t, 100)
}
//背景显示动画
function fadeIn(obj, callBack) {
	var i = 0;
	var j = 100;
	var timer = 0;

	function t() {
		i += 5;
		if(i > 90) {
			i = 100;
			clearInterval(timer)
			if(callBack) {
				callBack();
			}
		}
		j = i / 100;
		obj.style.opacity = j;
	}
	timer = setInterval(t, 100)
}

var fbg = document.getElementById("fbg");

//回调嵌套。
function M1Out() {
	var divs = fa0.getElementsByTagName("div");
	var M11 = new Move(divs[0], 0, 1500)
	var M12 = new Move(divs[1], 0, 1500)
	fadeOut(fbg, ob.notice)
	M11.animation();
	setTimeout(function() {
		M12.animation()
	}, 400);
}

function M1In() {

	fbg.style.backgroundImage = "url(img/fbg0.jpg)";
	fadeIn(fbg)
	var divs = fa0.getElementsByTagName("div");
	divs[0].style.left = "-1500px";
	divs[1].style.left = "-1500px";
	var M11 = new Move(divs[0], -1500, 0)
	var M12 = new Move(divs[1], -1500, 0)
	M11.animation();
	setTimeout(function() {
		M12.animation(ob.notice)
	}, 200);
}

function M2In() {
	//初始化背景图
	fbg.style.backgroundImage = "url(img/fbg1.jpg)";
	fadeIn(fbg)
	var divs = fa1.getElementsByTagName("div");
	divs[0].style.left = "-1500px";
	var m2 = new Move(divs[0], -1500, 0)
	m2.animation(ob.notice);
}

function M2Out() {
	var divs = fa1.getElementsByTagName("div");
	var m2 = new Move(divs[0], 0, 1500)
	m2.animation();
	fadeOut(fbg, ob.notice)
}

function M3In() {
	fbg.style.backgroundImage = "url(img/fbg2.jpg)";
	fadeIn(fbg)
	var divs = fa2.getElementsByTagName("div");
	divs[0].style.left = "-1500px";
	divs[1].style.left = "-1500px";
	divs[2].style.left = "-1500px";
	var M31 = new Move(divs[0], -1500, 0)
	var M32 = new Move(divs[1], -1500, 0)
	var M33 = new Move(divs[2], -1500, 0)

	M32.animation()
	setTimeout(function() {
		M31.animation();
	},300);

	setTimeout(function() {
		M33.animation(ob.notice)
	}, 600);

}

function M3Out() {
	var divs = fa2.getElementsByTagName("div");
	var M31 = new Move(divs[0], 0, 1500)
	var M32 = new Move(divs[1], 0, 1500)
	var M33 = new Move(divs[2], 0, 1500)
	M32.animation()
	setTimeout(function() {
		M31.animation();
	}, 300);
	setTimeout(function() {
		M33.animation()
	}, 600);
	fadeOut(fbg, ob.notice)
}

ob.lis = [pg, M1Out, M2In, pg, M2Out, M3In, pg, M3Out, M1In];
ob.start();


	function Play(id,active){
				this.ele = document.querySelector(id);
				this.active = active;
			}
			Play.prototype.playto = function(){	
				var o = this;
				addEvent(window,'scroll',function(){
					var y = getY(o.ele);   //求元素y坐标
					console.log(y);
					var h = client().height; //window窗口高度
					var sTop = (getScrollTop()).top; //滚动上去的高度
						if(y>sTop && (y <(sTop+h))){
							
							o.ele.className = o.active
						}else{
							console.log("不不在当前")
						}
				});			
			}
//			var box = new Play(' #box','move');
//				box.playto();
//			var box2 = new Play(' #box2','go');
//				box2.playto();
			function getScrollTop() {
				var sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
				var sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
				return {
					top: sTop,
					left: sLeft
				}
			}

			function getY(obj) {
				var y = 0;
				while(obj.tagName != "BODY") {
					y += obj.offsetTop + obj.offsetParent.clientTop;
					obj = obj.offsetParent;
				}
				return y;
			}
			
			function client() {
				if(window.innerHeight !== undefined) {
					return {
						"width": window.innerWidth,
						"height": window.innerHeight
					}

				} else if(document.compatMode === "CSS1Compat") {
					return {
						"width": document.documentElement.clientWidth,
						"height": document.documentElement.clientHeight
					}

				} else {
					return {
						"width": document.body.clientWidth,
						"height": document.body.clientHeight
					}
				}
			};
			//事件绑定
			function addEvent(obj,type,fn){
				if(typeof obj.addEventListener!='undefined'){
					obj.addEventListener(type,fn,false);
				}else{
					obj.attachEvent('on'+type,fn);
				}
			}