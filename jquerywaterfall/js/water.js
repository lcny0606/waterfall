$(function(){
	for(var i=20;i<30;i++){
		var oAB=$("<div>").addClass("box").appendTo($(".main"));
		var oAP=$("<div>").addClass('pic').appendTo($(oAB));
		$('<img>').attr('src','images/'+i+'.jpg').appendTo($(oAP));
	}
	waterfall();
	var imgData={'data':[{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'},{'src':'14.jpg'},{'src':'15.jpg'},{'src':'16.jpg'}]}
	$(window).on('scroll',function(){
		if(scrollpic){
			$.each(imgData.data,function(key,value){
				//console.log(value)
				var oSBox=$("<div>").addClass("box").appendTo($(".main"));
				var oSPic=$("<div>").addClass("pic").appendTo($(oSBox));
				$("<img>").attr('src','images/'+$(value).attr('src')).appendTo($(oSPic));
				
			})
			waterfall();
		}
		
	})
	
})

function waterfall(){
	var oPicW=$(".box").outerWidth();
	var oWin=$(window).width();
	var oList=Math.floor(oWin/oPicW);// 列数
	//console.log(oList);
	$(".main").css({
		'width':oList*oPicW,
		'margin':'0 auto'
	})
	var hArr=[];
	$(".box").each(function(index,value){
		//console.log(value)
		var	oBoxH=$(".pic").eq(index).height();
		if(index<oList){     //获取第一行图片
			hArr[index]=oBoxH; 
		}else{
			var oMinH=Math.min.apply(null,hArr);
			//console.log(oMinH);  //最小图片高度
			var oMinIndex=$.inArray(oMinH,hArr);
			$(value).css({
				'position':'absolute',
				'top':oMinH+35,
				'left':$(".pic").eq(oMinIndex).position().left	
			});
			hArr[oMinIndex]+= $('.pic').eq(index).height()+15;
		}	
	})
}

function scrollpic(){
	var oBox=$(".box");
	var oLastH=$(".main").last().offset().top+Math.floor(oBox.last().outerHeight()/2)   //获取最后一块
	var scrollT=$(window).scrollTop();
	var documentH=$(window).height();
	return (oLastH< scrollT+documentH)?true:flase;
	
}
