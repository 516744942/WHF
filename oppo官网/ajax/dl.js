//web基本对象
var DL={
	schoolName:"WEB前端學院",
	welcome:"欢迎想学真功夫的同学加入！",
	class1:"WEB前端學院",
	class2:"WEB前端工程师班",
	tel:"0551-65575635",
	qq:"技術解答Q: 354174199",
	site:"http://dx.phpdl.com",
	$:function(elemID){ return document.getElementById(elemID);},
//animate动画,默认为三次方缓动 
	animate:function(elem,prop,target,speed,callBack){
		if(elem.timer) clearTimeout(elem.timer);
		var begin = parseInt(DL.getStyle(elem,prop));  
		var change = target - begin; 
		//test.innerHTML  = speed;
		var duration = speed;
		var time = 0;
		Move();
		function Move(){			
			time += 5;		
			//test.innerHTML = time;
			elem.style[prop] = DL.easeOutCubic(time,begin,change,duration)+"px";
			if(time<duration){  
				elem.timer = setTimeout(Move,20);
			}
			else{
				if(callBack) callBack();
			}
		}
	},	
//easeOutCubic动画，参数含义：time(取值[0-d]),begin,change,duration
	easeOutCubic:function (t, b, c, d) {
		return Math.ceil(c*((t=t/d-1)*t*t + 1) + b);
	},	
//easeOutQuint5次方缓动曲线，备用
	easeOutQuint: function(t,b,c,d){
			var rs = c*((t=t/d-1)*t*t*t*t + 1) + b;
			return Math.ceil(rs);	
		},
//获取样式
	getStyle:function(obj,name){
  		if(obj.currentStyle){	return obj.currentStyle[name];	}
		else{	return document.defaultView.getComputedStyle(obj,null)[name];    	}
	},
//取消冒泡
	cancelBubble:function(ev){ ev ? ev.stopPropagation() : event.cancelBubble = true;},

//判断一个元素是否在当前窗口中
	isView:function (elem){
		//获取滚动上的高度
		var h1 = document.body.scrollTop || document.documentElement.scrollTop; 
		var h2 = document.documentElement.clientHeight; //获取浏览器高度
		var h3 = DL.getY(elem);	//获取对象距离网页顶部的高度
		var h4 = elem.offsetHeight; //获取对象本身高度
 
		if((h3+h4)<h1||(h3-h1)>h2){ return false; }
		else{ return true; }
	},	
//获取事件
	getEvent:function(ev){
		return ev||window.event;
	},

//鼠标事件判断一个元素是否在当前元素内部
	isSubElement:function(childElem,parentElem){ 
	try{
		while (childElem != undefined && childElem != null && childElem.tagName.toUpperCase() != "BODY"){ 
			if (childElem == parentElem){ 
				return true; 
			} 
			childElem = childElem.parentNode; 
		} 
	}
	catch(err){
		// alert(err.message);  //如果有错误可以输出错误信息
	}
		return false; 
	},
//获取onmouseout的来源于进入目的
	getFromElement:function(ev){
		return ev.target || ev.fromElement;
	}, 
//获取onmouseout的进入目的
	getToElement:function(ev){		 
			return  ev.relatedTarget || ev.toElement;	 
	},
//获取元素的相对整个网页的绝对高度
	getY:function(obj){
		var y=0
		while(obj != null){
			y+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return y;
	}	
};
var $ = DL.$;

window.onload = function(){
//所有a的管理
(function(){
	var oA = document.getElementsByTagName("a");
	for(p in oA){
		oA[p].href = DL.site;
		oA[p].onclick = function(){
			alert(DL.welcome);
		}
	}
})();
//初始化小圆圈的位置
(function(){
	var f  = $("f");
	var fa = f.getElementsByTagName("a");
	var L = fa.length;
	var fnav = $("fnav");
	var str = "";
	for(var i=0;i<L;i++){
		var cls="";
		if(i==0){ var cls = 'class="active"';}
		else{cls = "";}
		str += "<li "+cls+"></li>";
	}
	fnav.innerHTML = str;
	fnav.style.marginLeft = - L*12+4+"px";
})(); 
//flash幻灯片
(function(){
	var f = $("f");
	var fa = f.getElementsByTagName("a");
	var L = fa.length;
	var progress1 = $("progress1");
	var fbg = $("fbg");
	var speed = 200 ,step=300;
	var j=0,k=0,timer = null;
	var fnav = $("fnav");
	var lis = fnav.getElementsByTagName("li");
	//判断当前是哪一个
	function preIndex(elements){
		for(var i=0;i<elements.length;i++){
  			if(elements[i].getAttribute("active")=="1"){
				return i;
			}
		}
	}
	/*自动变化判断下一个应该是谁,第一个参数是当前的序号，第二个参数是一共有多少
	用户手工点击了哪个,直接填写nextIndex即可。*/
	function nextIndex(i,length){
		if(i<length-1) i++;
		else i=0;
		return i;
	}

function Move(toNext){	
	//初始化当前数据
		var pre = preIndex(fa);
		var fa_now = $("fa"+pre);
		var fas_now = fa_now.getElementsByTagName("div");
		var fbg_now =  "img/fbg"+pre+".jpg";
	//初始化下一个数据
		var next = 0;
		if(typeof toNext == "number"){ next = toNext;}
		else { next = nextIndex(pre,L);}
		var fa_next = $("fa"+next);
		var fas_next = fa_next.getElementsByTagName("div");
		var fbg_next =  "img/fbg"+next+".jpg";
	
	//当前运动出去,运动完毕后执行下一个进入
	MoveOut(MoveIn);
	function MoveOut(MoveCallBack){	
		setTimeout(function(){DL.animate(fas_now[0],"left",1500,speed)},0);
		setTimeout(function(){DL.animate(fas_now[1],"left",1500,speed)},600);
		setTimeout(function(){DL.animate(fas_now[2],"left",1500,speed)},1200);
		outOpacity(100,fbg,function(){ fnIni(fa_now,MoveCallBack);});
		function outOpacity(num,elem,fnCallBack){
			if(num>0){
				num -= 2;
				elem.style.opacity = num/100;
				setTimeout(function(){outOpacity(num,elem,fnCallBack);},20);
			}
			else{
				if(fnCallBack) fnCallBack();
			}
		}
	//初始化消失后的元素，为下一次运动做准备
		function fnIni(elem,CallBack){
			DL.animate(fas_now[0],"left",-1500,5);
			DL.animate(fas_now[1],"left",-1500,5);
			DL.animate(fas_now[2],"left",-1500,5);
			lis[pre].className = "";
			elem.className = "fanot";
			elem.setAttribute("active",0);
			if(CallBack) CallBack();
		}
	}
	//下一个运动进入
	function MoveIn(){	
	
		lis[next].className = "active";
		fbg.style.backgroundImage="url("+fbg_next+")";
		setTimeout(function(){DL.animate(fas_next[0],"left",0,speed)},0);
		setTimeout(function(){DL.animate(fas_next[1],"left",0,speed)},600);
		setTimeout(function(){DL.animate(fas_next[2],"left",0,speed)},1200);
		inOpacity(0,fbg,function(){ fnIni(fa_next);});
		function inOpacity(num,elem,fnCallBack){
			if(num<100){
				num += 2;
				elem.style.opacity = num/100;
				setTimeout(function(){inOpacity(num,elem,fnCallBack);},20);
			}
			else{
				if(fnCallBack) fnCallBack();
			}
		}
	//初始化进入的元素，为下一次运动做准备
		function fnIni(elem){
			elem.className = "fanow";
			elem.setAttribute("active","1");
			clearTimeout(timer);
			timer =setTimeout(function(){DL.animate(progress1,"width",1180,1000,iniMove);},1000);
		}
	}
}

	function iniMove(toNext){
		timer = setTimeout(function(){Move(toNext);},50);
		DL.animate(progress1,"width",0,5);
	}
	//进度条自动滚动
	DL.animate(progress1,"width",1180,1000,iniMove);
	
	//如果点击按钮则停止自动切屏
	for(var i=0;i<lis.length;i++){
		lis[i].index = i;
		lis[i].onclick=function(){
			clearTimeout(timer);
			iniMove(this.index);
		}
	}
		

})(); 



//鼠标放上去闪动动画
(function(){
	var class3 =  $("class3"); 
	var courseBox = $("courseBox"); 	
	var studentBox =$("studentBox"); 
	var boxa1 = class3.getElementsByTagName("a");
	var boxa2 = courseBox.getElementsByTagName("a");
	var boxa3 = studentBox.getElementsByTagName("a");
	animate(boxa1);
	animate(boxa2);
	animate(boxa3);
	function animate(elements){
		var speed = 20; //动画延迟时间
		for(i=0;i<elements.length;i++){
 			var obj = elements[i];
			obj.onmouseover = function(){ 
					that  = this;	
					DL.animate(that,"top",-8,speed);
				};
			obj.onmouseout = function(ev){
				ev =  DL.getEvent(ev);
				var fromElem = DL.getFromElement(ev);
				var toElem = DL.getToElement(ev);
				that  = this;	
				if(!(DL.isSubElement(fromElem,that) && DL.isSubElement(toElem,that))){
					DL.animate(that,"top",0,speed);
				}
			};
		}
	}

	
	function animateT(elements){
		class3.setAttribute("flag","0");
		var speed = 200; //动画延迟时间
		for(i=0;i<elements.length;i++){
 			var obj = elements[i];
		 	DL.animate(obj,"top",0,speed);			 
		}
	}
	iniClass = function(){
		var flag =  parseInt(class3.getAttribute("flag"));
	 	if(flag && DL.isView(class3)){ animateT(boxa1);}
	}
	
})();

//course课程内容
(function(){
	var c1 = $("c1"),c2 = $("c2"),c3 = $("c3"),c4 = $("c4");
	var c5 = $("c5"),c6 = $("c6"),c7 = $("c7"),c8 = $("c8");
	var speed = 200;	
	iniCourse = function(){
		if(DL.isView(c1)) DL.animate(c1,"left",0,speed);	
		if(DL.isView(c3)) DL.animate(c3,"left",300,speed);	
		if(DL.isView(c4)) DL.animate(c4,"left",0,speed);	
		if(DL.isView(c5)) DL.animate(c5,"right",0,speed);	
		if(DL.isView(c6)) DL.animate(c6,"right",300,speed);		
		if(DL.isView(c7)) DL.animate(c7,"right",0,speed);	
		if(DL.isView(c8)) DL.animate(c8,"right",0,speed);	
	};
})();

//student学员作品
(function(){
	var s1 = $("s1"),s2 = $("s2"),s3 = $("s3"),s4 = $("s4"),s5 = $("s5");
	var speed = 200;
	iniStudent = function(){
		if(DL.isView(s1)) 	DL.animate(s1,"left",0,speed);	
		if(DL.isView(s2))	DL.animate(s2,"left",400,speed);		
		if(DL.isView(s3))	DL.animate(s3,"left",0,speed);	
		if(DL.isView(s4))	DL.animate(s4,"left",400,speed);	
		if(DL.isView(s5))	DL.animate(s5,"right",0,speed);	
	};
		 
})();
//底部报名流程动画
(function(){
	var sul = $("sul") ;
	var lis = sul.getElementsByTagName("li");
	function fnLC(){
		sul.setAttribute("flag",0);
	 	var step = 300,speed=200;
		setTimeout(function(){ DL.animate(lis[0],"top",0,speed); },0*step);
		setTimeout(function(){ DL.animate(lis[1],"top",0,speed); },1*step);
		setTimeout(function(){ DL.animate(lis[2],"top",0,speed); },2*step);
		setTimeout(function(){ DL.animate(lis[3],"top",0,speed); },3*step);
		setTimeout(function(){ DL.animate(lis[4],"top",0,speed); },4*step); 				
	}
	iniService = function (){
		var sul = $("sul");
		var flag = parseInt(sul.getAttribute("flag"));
		if(flag && DL.isView(sul)){fnLC();}
	}
	
//底部报名流程鼠标放上去动画
	var speed = 200;
	animate(lis[3]);
	animate(lis[4]);
	function animate(ele){
		ele.onmouseover = function(){ 	
					that  = this;	
					DL.animate(that,"top",-8,speed);
				};
		ele.onmouseout = function(){
					that  = this;	 
					DL.animate(that,"top",0,speed);
			};
	}	
})(); 



//选项卡功能
(function(){
	var s51 = $("s51"), s52 = $("s52"), s61 = $("s61"), s62 = $("s62");
	s51.onclick = function(){
		s52.className = "s5not";
		s62.className = "s6not";	
		s51.className = "s5now";
		s61.className = "s6now";	
	}
	s52.onclick = function(){
		s51.className = "s5not";
		s52.className = "s5now";
		s61.className = "s6not";
		s62.className = "s6now";
	};
})();
 

//如果对应动画出现在窗口中则执行相应方法
window.onscroll = function(){
	iniClass(); 	//班级类型
	iniCourse();	//课程内容
	iniStudent();	//学员作品
	iniService(); 	//底部服务
}; 
//结束
};