var firstLi = new Play(' #first-li','phoneli').playto();
var secondLi= new Play(' #second-li','phoneli').playto();
var thirdLi = new Play(' #third-li','phoneli').playto();
var forthLi = new Play(' #forth-li','phoneli').playto();
				
				
//course
var cfirstImg = new Play('#course-first','cfirst-img').playto();
var cthirdImg = new Play('#course-third','cthird-img').playto();
var cforthImg = new Play('#course-forth','cforth-img').playto();
var cfifthImg = new Play('#course-fifth','cfifth-img').playto();
var ccsixthImg = new Play('#course-sixth','csixth-img').playto();
var cfifthtImg = new Play('#course-seventh','cseventh-img').playto();
var ceighthtImg = new Play('#course-eighth','ceighth-img').playto();

//student

var sfirstImg = new Play('#contentone','s-first-img').playto();
var ssecondImg = new Play('#contenttwo','s-second-img').playto();
var sthirdImg = new Play('#contentthree','s-third-img').playto();
var sforthImg = new Play('#contentfour','s-forth-img').playto();

//student right
 var rightButtons = document.querySelectorAll("#right-button  span");
 var rightSections = document.querySelectorAll("#right-content section");
 
 !(function(){
 	rightButtons[0].onclick = function(){
 		iNi();
 		rightSections[0].className ="show";
 		rightButtons[0].className ="active"
 	}
 	rightButtons[1].onclick = function(){
 		iNi();
 		rightSections[1].className ="show";
 		rightButtons[1].className ="active"
 		
 	}
 })();
 
 function iNi(){
 	rightSections[0].className ="hidden";
 	rightSections[1].className ="hidden";
 	rightButtons[0].className ="hide";
 	rightButtons[1].className ="hide"
 	
 }
var contentMove = new Play('#content-right','content-move').playto();


//service
//var servicOne = new Play('#serviceone','firstli').playto();
//var servicTwo = new Play('#servicetwo','secondli').playto();
//var servicThree = new Play('#servicethree','thirdli').playto();
//var servicfour = new Play('#servicefour','fourthli').playto();
//var servicFive = new Play('#servicefive','fifthli').playto();
		
		var lastList  = document.querySelector("#service-move");
		var lastLists = document.querySelectorAll("#service-move li") ;
			window.onscroll = function(){
				var y = getY(lastList);   //求元素y坐标
				var h = client().height; //window窗口高度
				var sTop = (getScrollTop()).top; //滚动上去的高度
						if(y>sTop && (y <(sTop+h))){
							function M(i) {
						m1 = new MoveR(lastLists[i],0,"top").animation();
					}

					for(var i = 0; i < lastLists.length; i++) {
						setTimeout(M, i * 500, i);
					}
				}else{
					console.log("不不在当前")
				}
			  }
			
			