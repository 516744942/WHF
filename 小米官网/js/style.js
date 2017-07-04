var navHeaderLis = document.querySelectorAll("#nav-header li")
			var headerNavMenu = document.querySelector(".header-nav-menu");
			var test = document.querySelector("#test");
			var MenuSection= document.querySelectorAll(".menu-content section");
			
			!function(){
			for(var i = 0; i < navHeaderLis.length-2; i++) {
				navHeaderLis[i].index = i;
				navHeaderLis[i].onmouseenter = contentInnerHTML;
				
				function contentInnerHTML() {
					
					i = this.index;
					headerNavMenu.innerHTML = MenuSection[i].innerHTML;
					headerNavMenu.className = "sub menu";
					
				};
				navHeaderLis[i].onmouseleave = function() {					
					headerNavMenu.className = "menu";
					headerNavMenu.addEventListener("mouseenter", function() {
						headerNavMenu.className = "sub menu";
					}, true)					
				}
			}
			}();
			headerNavMenu.onmouseleave = function() {
				this.className = "menu";
				
			}
//xiaomiform
var myinput = document.querySelector(".header-search input")
			var mydata = document.querySelector("#mydata")
			var data = ['小米6', '小米5', '红米3', '手环', '手铐', '移动电影']
			var lis = "";
			var nothing="";

			function showList() {
				var str = ""
				for(var i = 0; i < data.length; i++) {
					str += "<li>" + data[i] + "</li>";
				}

				mydata.innerHTML = str;

				//给li绑定单击事件
				lis = document.querySelectorAll("#mydata li");
				console.log(lis)
				for(var i = 0; i < lis.length; i++) {
					lis[i].onclick = function() {
						myinput.value = this.innerText;
						//myinput.parentNode.submit(); 表单自动提交

					}
				}

			}
//navHeaderLis.onclick =function(){
//				mydata.innerHTML = nothing;
//			}
			myinput.onfocus = showList;
			
//		
document.onclick = function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var _tar = myinput;
    //1. 点击事件的对象不是目标区域本身
    //2. 事件对象同时也不是目标区域的子元素
    if( !(target == _tar) && ! _tar.contains(target) ){
        mydata.innerHTML = nothing;
    } else {
        //你的功能
    }
}
			
			//有能力获取键盘事件？
			var k = -1;
			myinput.onkeydown = function(ev) {
				
				if(ev.keyCode == 40) {
					++k;
					k = k >= lis.length - 1 ? lis.length - 1 : k;
					//去掉非当前的背景class.
					(k >= 1) ? (lis[k - 1].className = "") : null
					if(k == 0) {
						lis[lis.length - 1].className = ""
					}
					//给当前li添加背景
					lis[k].className = "gray";
					myinput.value = lis[k].innerText;

				} else if(ev.keyCode == 38) {
					k = (k <= 0) ? 0 : --k;

					if(k < (lis.length - 1)) {
						lis[k + 1].className = "";
					}

					lis[k].className = "gray";
					myinput.value = lis[k].innerText;

				}

			}

			//获取用户输入显示相关内容
			myinput.oninput = showList2;
			function showList2(ev) {
				//获取用户输入内容
				var inputValue = this.value;

				var str = ""
				for(var i = 0; i < data.length; i++) {
					if(data[i].indexOf(inputValue) > -1) {
						str += "<li>" + data[i] + "</li>";
					}
				}
				mydata.innerHTML = str;

				//给li绑定单击事件
				lis = document.querySelectorAll("#mydata li");
				console.log(lis)
				for(var i = 0; i < lis.length; i++) {
					lis[i].onclick = function() {
						myinput.value = this.innerText;

					}
				}

			}

//banner
var arrs = document.querySelectorAll(".banner-buttons div");
			var lis = document.querySelectorAll(".nav-banner li");
			var lisx = document.querySelectorAll(".nav-banner-li li");
			var flash = document.querySelector(".banner-total");
			var i = 0,
				timer,
				interval = 3000;
			//单击左边		
			arrs[0].onclick =function() {
				i--;
				(i < 0) ? (i = lis.length - 1) : null;
				//初始化所有li的z-index
				MyIni(i);
			}
			arrs[1].onclick = Next;

			//初始化所有li
			function MyIni(k) {
				for(var i = 0; i < lis.length; i++) {
					lis[i].className = "";
					lisx[i].className = "";
				}
				lis[k].className = "now";
				lisx[k].className = "nowx";
			}

			//小圆点的控制
			(function() {
				for(var k = 0; k < lis.length; k++) {
					lisx[k].index = k;
					lisx[k].onclick = Circle;
				}
				//优化下
				function Circle() {
					i = this.index; //必须
					MyIni(i); //必须
				}
			}());

			//自动播放功能
			function Next() {
				i++;
				(i == lis.length) ? (i = 0) : null;
				MyIni(i);
			}
			timer = setInterval(Next, interval);
			flash.onmouseover = function() {
				clearInterval(timer);
			}
			flash.onmouseout = function() {
				timer = setInterval(Next, interval);
			}
			

//home-star-goods
var starnameBtn = document.querySelectorAll(".starname span");
			var wrapperUl = document.querySelector(".xm-carousel-wrapper ul");
			var starButton = document.querySelector(".star-button");
			var z = 0,
				timertwo;
			starnameBtn[1].onclick = function() {

				wrapperUl.className = "now1";
				this.className = "disable"
				this.previousElementSibling.className = "";
				z = 1;
			}
			starnameBtn[0].onclick = function() {
				wrapperUl.className = "now2";
				this.className = "disable"
				this.nextElementSibling.className = "";
				z= 0;
			}

			//自动走动

			function AutoPlay() {
				if(z == 0) {
					z = 1;
					wrapperUl.className = "now1";
					starnameBtn[0].className = ""
					starnameBtn[1].className = "disable"
				} else if(z == 1) {
					z = 0;
					wrapperUl.className = "now2";
					starnameBtn[0].className = "disable"
					starnameBtn[1].className = "";
				}

			}

			timertwo = setInterval(AutoPlay, 5000);

			starButton.onmouseover = function() {
				clearInterval(timertwo)
			}
			starButton.onmouseout = function() {
				timertwo = setInterval(AutoPlay, 5000);
			}
			
//home-main
	function SN(_id) {
				var selectBtn = document.querySelectorAll( _id  +" .select-button li");
				var selectuls = document.querySelectorAll( _id  +" .select-body-right ul");
		
				for(var i = 0; i < selectBtn.length; i++) {
					selectBtn[i].index = i;
					selectBtn[i].onmouseover = function() {
						ini()
						//让当前选项卡亮色
						this.className = "select-active";
						selectuls [this.index].className = "body-active";
					}
				}

				function ini() {
					for(var i = 0; i < selectBtn.length; i++) {
						selectBtn[i].className = "";
						selectuls[i].className = "body-hiden";
					}
				}
					
			}
	
			SN("#sectionone");
			SN("#sectiontwo");
			
//content
function myMove(_id) {
				var ContentArrs = document.querySelectorAll( _id + " .pagers-buttons div");
				var ContentLisx = document.querySelectorAll( _id + " .pagers-wrapper li");
				var ContentLUl = document.querySelector( _id + " .contentlist");
				var ContentLis = document.querySelectorAll( _id + " .contentlist li");
				
//				var ContentFlash = document.querySelector(_id + " .flash");
				var W = 0;
				//单击左边		
				ContentArrs[0].onclick = Pre;
				//单击右边箭头
				ContentArrs[1].onclick = Next

				function Next() {
					W < (ContentLis.length - 1) ? W++ : null;
					ContentLUl.style.left = -W * 296 + "px";
					MyInitwo(W)
				}

				function Pre() {
					W >= 1 ? W-- : null;
					ContentLUl.style.left = -W * 296 + "px";
					MyInitwo(W)
				}

				function MyInitwo(k) {
					for(var j = 0; j < ContentLisx.length; j++) {
						ContentLisx[j].className = "";
					}
					ContentLisx[k].className = "xm-pagers-active";
				}

			}

			myMove("#contentone");
			myMove("#contenttwo");
			