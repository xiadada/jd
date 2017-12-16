;(function(){
	carouselTimer = {};	
	var app = {
		init: function(){
			this.getStart();
			this.event();
		},
		getStart: function(){
			$.fn.extend({
				'carousel': function(param){
					var elem = this;
					return openCarousel(elem, param);
				},
				'slideMove': function(param){
					var elem = this;
					return openSlideMove(elem, param);
				}
			})
		},
		event: function(){

		}

	};
	app.init();
})($);

/*
*轮播组件部分
*/
var carouselMap = {};
function openCarousel(elem, param){
	//默认参数
	var defaults = {
		'data': ' ',
		'isSkip': true,
		'isInfinit': true,
		'isSlide': false,
		'isBtn': true,
		'skipTrigger': 'hover'
	};
	//合并参数
	var options = $.extend(true, defaults, param);
	var carouselCount = $('.xpy-carousel-img-hold').length;
	carouselMap['carousel-'+carouselCount] = {};
	carouselMap['carousel-'+carouselCount].flag = true;
	carouselMap['carousel-'+carouselCount].timer;
	carouselMap['carousel-'+carouselCount].index = 0;
	carouselMap['carousel-'+carouselCount].data = options.data;
	
	//图片容器html结构,和圈的结构
	carouselMap['carousel-'+carouselCount].imgItemHtml = '';
	carouselMap['carousel-'+carouselCount].circleHtml = '<div class="xpy-carousel-circle clearfix">';
	for(var i = 0; i < carouselMap['carousel-'+carouselCount].data.length; i++){
		carouselMap['carousel-'+carouselCount].imgItemHtml += '<li class="xpy-carousel-img-item"><img src="'+ carouselMap['carousel-'+carouselCount].data[i].url +'"></li>';
		carouselMap['carousel-'+carouselCount].circleHtml += '<span></span>'
	}
	
	//轮播总体html结构
	if(options.isSkip == true && options.isBtn == true){
		var carouselHtml = '<div class="xpy-carousel-wrapper" id="carousel-'+ carouselCount +'">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+					
								carouselMap['carousel-'+carouselCount].circleHtml+
								'</div>'+
								'<div class="xpy-btn xpy-btn-left" data-orient="left"><</div>'+
								'<div class="xpy-btn xpy-btn-right" data-orient="right">></div>'+
							'</div>';
	}else if(!options.isSkip && options.isBtn == true){
		var carouselHtml = '<div class="xpy-carousel-wrapper">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+
								'<div class="xpy-btn xpy-btn-left" data-orient="left"><</div>'+
								'<div class="xpy-btn xpy-btn-right" data-orient="right">></div>'+
							'</div>'; 
	}else if(options.isSkip == true && !options.isBtn){
		var carouselHtml = '<div class="xpy-carousel-wrapper" id="carousel-'+ carouselCount +'">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+					
								carouselMap['carousel-'+carouselCount].circleHtml+
								'</div>'+
							'</div>';

	}else if(!options.isSkip && !options.isBtn){
		var carouselHtml = '<div class="xpy-carousel-wrapper">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+
							'</div>'; 
	}
	$(elem).css({'overflow': 'hidden'});
	$(elem).append(carouselHtml);
	var items = $(elem).find('.xpy-carousel-img-item');
	var width = items.length*$(elem).width();
	$(elem).find('.xpy-carousel-img-hold').width(width);
	$(elem).find('.xpy-carousel-img-item').width(1 / items.length * 100 + '%');
	if(!options.isInfinit){
		$(elem).find('.xpy-btn-left').addClass('forbidden');
	}
	if(options.isSkip){
		$(elem).find('.xpy-carousel-circle span').eq(0).addClass('xpy-action');
	}
	//自动向右播放
	carouselMap['carousel-'+carouselCount].timer = setInterval(function(){
		carouselRightMove(elem,options,carouselCount);
	},options.slideTime);
	//鼠标移入移出事件
	$(elem).find('.xpy-carousel-wrapper').on('mouseover',function(){
		var nowCarouselCount = $(this).attr('id').split('-')[1];
		clearInterval(carouselMap['carousel-'+nowCarouselCount].timer);
	});
	$(elem).find('.xpy-carousel-wrapper').on('mouseout',function(){
		var nowCarouselCount = $(this).attr('id').split('-')[1];
		carouselMap['carousel-'+nowCarouselCount].timer = setInterval(function(){
			carouselRightMove(elem,options,nowCarouselCount);
		},options.slideTime);
	});

	//左右键点击事件
	$(elem).find('.xpy-btn-right').on('click',function(){	
		var nowCarouselCount = $(this).closest('.xpy-carousel-wrapper').attr('id').split('-')[1];	
		if(options.isInfinit == true){
			carouselRightMove(elem,options,nowCarouselCount);			
		}else{
			//为最后一张时，禁止循环轮播
			if($(elem).find('.xpy-carousel-img-hold').css('left') == 0-$(elem).find('.xpy-carousel-img-hold').outerWidth() + $(elem).width() + 'px'){
				return;
			}else{
				carouselRightMove(elem,options,nowCarouselCount);
			}
		}
	});
	$(elem).find('.xpy-btn-left').on('click',function(){
		var nowCarouselCount = $(this).closest('.xpy-carousel-wrapper').attr('id').split('-')[1];
		if(options.isInfinit == true){
			carouselLeftMove(elem,options,nowCarouselCount);
		}else if(!options.isInfinit){
			//为第一张时禁止左轮播图片
			if($(elem).find('.xpy-carousel-img-hold').css('left') == '0px'){
				return;
			}else{
				carouselLeftMove(elem,options,nowCarouselCount);
			}	
		}					
	});


	//圆点hover触发形式
	if(options.isSkip){
		if(options.skipTrigger == 'hover'){
		$(elem).find('.xpy-carousel-circle').on('mouseover','span',function(){
			carouselMap['carousel-'+carouselCount].index = $(this).index();
			if(!options.isSlide){
				$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
					$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'},0).fadeIn(300);	
				})				
			}else{
				$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
					$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'}).fadeIn(300);
				})				
			}
			if($(elem).find('.xpy-carousel-img-hold').css('left') == 0-$(elem).find('.xpy-carousel-img-hold').outerWidth() + $(elem).width() + 'px' && !options.isInfinit){
				$(elem).find('.xpy-btn-right').addClass('forbidden');
			}else if($(elem).find('.xpy-carousel-img-hold').css('left') == '0px' && !options.isInfinit){
				$(elem).find('.xpy-btn-left').addClass('forbidden');
			}else{
				$(elem).find('.xpy-btn-right').removeClass('forbidden');
				$(elem).find('.xpy-btn-left').removeClass('forbidden');
			}
			if(options.isSkip){
				$(elem).find(this).addClass('xpy-action').siblings().removeClass('xpy-action');
			}			
		})
		//圆点click点击触发形式
		}else if(options.skipTrigger == 'click'){
			$(elem).find('.xpy-carousel-circle').on('click','span',function(){
				carouselMap['carousel-'+carouselCount].index = $(this).index();
				if(!options.isSlide){
					$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
						$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'},0).fadeIn(300);	
					})
				}else{
					$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
						$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'}).fadeIn(300);
					})
				}
				if($(elem).find('.xpy-carousel-img-hold').css('left') == 0-$(elem).find('.xpy-carousel-img-hold').outerWidth() + $(elem).width() + 'px' && !options.isInfinit){
					$(elem).find('.xpy-btn-right').addClass('forbidden');
				}else if($(elem).find('.xpy-carousel-img-hold').css('left') == '0px' && !options.isInfinit){
					$(elem).find('.xpy-btn-left').addClass('forbidden');
				}else{
					$(elem).find('.xpy-btn-right').removeClass('forbidden');
					$(elem).find('.xpy-btn-left').removeClass('forbidden');
				}
				if(options.isSkip){
					$(elem).find(this).addClass('xpy-action').siblings().removeClass('xpy-action');
				}		
			})
		}
	}	

}
function carouselRightMove(elem,param,carouselCount){
	var items = $(elem).find('.xpy-carousel-img-item');
	var width = items.length*$(elem).width();
	if(carouselMap['carousel-'+carouselCount].flag){
		carouselMap['carousel-'+carouselCount].flag = false;
		var $picWrap =$(elem).find('.xpy-carousel-img-hold').eq(0),
			$picItems = $picWrap.find('.xpy-carousel-img-item');
		var left = -$(elem).width();
		if(!param.isSlide){
			$picWrap.fadeOut(200,function(){
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},0,function(){
					if($picWrap.css('left') == '0px' && !param.isInfinit){
						$(elem).find('.xpy-btn-left').addClass('forbidden');
					}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
						$(elem).find('.xpy-btn-right').addClass('forbidden');
					}else if($picWrap.css('left') == 0 - $picWrap.width() + 'px'){
						$picWrap.css({'left': '0px'});
					}else{
						$(elem).find('.xpy-btn-left').removeClass('forbidden');
						$(elem).find('.xpy-btn-right').removeClass('forbidden');
					}
					carouselMap['carousel-'+carouselCount].index ++;
					if(param.isSkip){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				}).fadeIn(300);
			})
		}else{
			if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px'){
				var circleHtml = '<ul class="xpy-carousel-img-hold clearfix" id ="carousel-'+carouselCount+'">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>';
				$(elem).find('.xpy-carousel-wrapper').append(circleHtml);
				$(elem).find('.xpy-carousel-img-hold').eq(1).width(width).css({'left': $(elem).width()});
				$(elem).find('.xpy-carousel-img-item').width(1 / items.length * 100 + '%');
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},function(){
					$picWrap.remove();
				})
				$(elem).find('.xpy-carousel-img-hold').eq(1).animate({
					'left': parseInt($(elem).find('.xpy-carousel-img-hold').eq(1).css('left')) + left
				},function(){
					carouselMap['carousel-'+carouselCount].index ++;
					carouselMap['carousel-'+carouselCount].index = carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length;
					if(param.isSkip){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				})
				
			}
			$picWrap.animate({
				'left': parseInt($picWrap.css('left')) + left
			},function(){
				if($picWrap.css('left') == '0px' && !param.isInfinit){
					$(elem).find('.xpy-btn-left').addClass('forbidden');
				}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
					$(elem).find('.xpy-btn-right').addClass('forbidden');
				}else{
					$(elem).find('.xpy-btn-left').removeClass('forbidden');
					$(elem).find('.xpy-btn-right').removeClass('forbidden');
				}
				carouselMap['carousel-'+carouselCount].index ++;
				if(param.isSkip){
					$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
				}
				carouselMap['carousel-'+carouselCount].flag = true;
			})
		}
		
	}
}


function carouselLeftMove(elem,param,carouselCount){
	var items = $(elem).find('.xpy-carousel-img-item');
	var width = items.length*$(elem).width();
	if(carouselMap['carousel-'+carouselCount].flag){
		carouselMap['carousel-'+carouselCount].flag = false;
		var $picWrap =$(elem).find('.xpy-carousel-img-hold').eq(0),
			$picItems = $picWrap.find('.xpy-carousel-img-item');
		var left = $(elem).width();

		if(!param.isSlide){
			$picWrap.fadeOut(200,function(){
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},0,function(){
					if($picWrap.css('left') == '0px' && !param.isInfinit){
						//禁止轮播的情况
						$(elem).find('.xpy-btn-left').addClass('forbidden');
					}else if($picWrap.css('left') == $(elem).width() + 'px'){
						//循环轮播的情况
						$picWrap.css({'left': 0 - $(elem).find('.xpy-carousel-img-hold').width() + $(elem).width() + 'px'});
					}else if($picWrap.css('left') == 0 - $(elem).find('.xpy-carousel-img-hold').width() + $(elem).width() + 'px' && !param.isInfinit){
						//禁止轮播的情况
						$(elem).find('.xpy-btn-right').addClass('forbidden');						
					}else{
						$(elem).find('.xpy-btn-left').removeClass('forbidden');
						$(elem).find('.xpy-btn-right').removeClass('forbidden');
					}
					carouselMap['carousel-'+carouselCount].index --;
					if(param.isSkip){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				}).fadeIn(300);
			})			
		}else{
			if($picWrap.css('left') == '0px'){
				var circleHtml = '<ul class="xpy-carousel-img-hold clearfix" id ="carousel-'+carouselCount+'">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>';
				$(elem).find('.xpy-carousel-wrapper').append(circleHtml);
				$(elem).find('.xpy-carousel-img-hold').eq(1).width(width).css({'left': -$picWrap.width()});
				$(elem).find('.xpy-carousel-img-item').width(1 / items.length * 100 + '%');
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},function(){
					$picWrap.remove();
				})
				$(elem).find('.xpy-carousel-img-hold').eq(1).animate({
					'left': parseInt($(elem).find('.xpy-carousel-img-hold').eq(1).css('left')) + left
				},function(){
					carouselMap['carousel-'+carouselCount].index --;
					carouselMap['carousel-'+carouselCount].index = carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length;
					if(param.isSkip){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				})
				
			}
			$picWrap.animate({
				'left': parseInt($picWrap.css('left')) + left
			},function(){
				if($picWrap.css('left') == '0px' && !param.isInfinit){
					$(elem).find('.xpy-btn-left').addClass('forbidden');
				}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
					$(elem).find('.xpy-btn-right').addClass('forbidden');
				}else{
					$(elem).find('.xpy-btn-left').removeClass('forbidden');
					$(elem).find('.xpy-btn-right').removeClass('forbidden');
				}
				carouselMap['carousel-'+carouselCount].index --;
				if(param.isSkip){
					$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
				}
				carouselMap['carousel-'+carouselCount].flag = true;
			})
		}
		
	}
}
/*
*滑动组件部分
*/
function openSlideMove(elem, param){
	//默认参数
	var defaults = {
		'data': ' ',
		'isInfinit': true,
		'slideLength': 5,
		'showLength': 5,
		'showImgContentWidth': 200
	};
	//合并参数
	var options = $.extend(true, defaults, param);
	var SlideMoveCount = $('.xpy-slide-img-hold').length;
	imgItemHtml = '';

	//图片容器html结构
	for(var i = 0; i < options.data.length; i++){
		if(options.data[i].text){
			imgItemHtml += '<li class="xpy-slide-img-item">'+
								'<img src="'+ options.data[i].url +'">'+
								'<div class="xpy-slide-textholder style=height:26%">'+
									'<div class="xpy-slide-text-title">' + options.data[i].text + '</div>'+
									'<div class="xpy-slide-text-price">'+
										'<span class="xpy-slide-text-promotion-price"><i>￥</i><span>' + options.data[i].promotionPrice + '</span></span>'+
										'<span class="xpy-slide-text-original-price"><i>￥</i><del>' + options.data[i].originalPrice + '</del></span>'+
									'</div>'+
								'</div>'+
						'</li>';
			$(elem).find('img').eq(i).css({'height': '74%'})
		}else{
			imgItemHtml += '<li class="xpy-slide-img-item"><img src="'+ options.data[i].url +'"></li>';
		}
	}	
	//滑动组件总体html结构
		var slideMoveHtml = '<div class="xpy-slide-wrapper" id="xpy-slide-wrapper'+SlideMoveCount+'">'+
								'<ul class="xpy-slide-img-hold clearfix">'
									+imgItemHtml+
								'</ul>'+							
								'<div class="xpy-slide-btn xpy-slide-btn-left"><</div>'+
								'<div class="xpy-slide-btn xpy-slide-btn-right">></div>'+
							'</div>'
	
	$(elem).append(slideMoveHtml);
	var items = $(elem).find('.xpy-slide-img-item');
	$(elem).width(options.showLength*options.showImgContentWidth);
	$(elem).find('.xpy-slide-img-hold').width(items.length*options.showImgContentWidth);
	$(elem).find('.xpy-slide-img-item').width(options.showImgContentWidth-1);
	if(!options.isInfinit){
		$(elem).find('.xpy-slide-btn-left').addClass('forbidden');
	}
	if(options.rubberBanding){
		// $(elem).find('.img')
	}
	$(elem).on('mouseenter',function(){
		$(elem).find('.xpy-slide-btn').show();
	}).on('mouseleave',function(){
		$(elem).find('.xpy-slide-btn').hide();
	})
	//左右键点击事件
	$(elem).find('.xpy-slide-btn-right').on('click',function(){
		var $currentSlideWrapper = $(this).closest('.xpy-slide-wrapper');
		var nowSlideCount = $currentSlideWrapper.attr('id').substr($currentSlideWrapper.attr('id').length-1);
		if(options.isInfinit == true){
			slideRightMove(elem,options,nowSlideCount);			
		}else{
			//为最后显示的几张时，禁止循环轮播
			if($(elem).find('.xpy-slide-img-hold').css('left') == 0-$(elem).find('.xpy-slide-img-hold').outerWidth() + $(elem).width() + 'px'){
				return;
			}else{
				slideRightMove(elem,options,nowSlideCount);
			}
		}
	});
	$(elem).find('.xpy-slide-btn-left').on('click',function(){
		var $currentSlideWrapper = $(this).closest('.xpy-slide-wrapper');
		var nowSlideCount = $currentSlideWrapper.attr('id').substr($currentSlideWrapper.attr('id').length-1);
		if(options.isInfinit == true){
			slideLeftMove(elem,options,nowSlideCount);
		}else if(!options.isInfinit){
			//为第一张时禁止左轮播图片
			if($(elem).find('.xpy-slide-img-hold').css('left') == '0px'){
				return;
			}else{
				slideLeftMove(elem,options,nowSlideCount);
			}	
		}					
	});
}
var flag = true;
function slideRightMove(elem,param,SlideMoveCount){
	var items = $(elem).find('.xpy-slide-img-item');
	var width = items.length*param.showImgContentWidth;
	var $picWrap =$(elem).find('.xpy-slide-img-hold').eq(0),
		$picItems = $picWrap.find('.xpy-slide-img-item');
	var left = -param.slideLength*param.showImgContentWidth;
	if(flag){
		flag = false;
		if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px'){
			var circleHtml = '<ul class="xpy-slide-img-hold clearfix" id="xpy-slide-wrapper'+SlideMoveCount+'">'+imgItemHtml+'</ul>';
			$(elem).find('.xpy-slide-wrapper').append(circleHtml);
			$(elem).find('.xpy-slide-img-hold').eq(1).width(width).css({'left': $(elem).width()});
			$(elem).find('.xpy-slide-img-item').width(param.showImgContentWidth-1);
			$picWrap.animate({
				'left': parseInt($picWrap.css('left')) + left
			},function(){
				$picWrap.remove();
				flag = true;
			})
			$(elem).find('.xpy-slide-img-hold').eq(1).animate({
				'left': parseInt($(elem).find('.xpy-slide-img-hold').eq(1).css('left')) + left
			})
			
		}
		$picWrap.animate({
			'left': parseInt($picWrap.css('left')) + left
		},function(){
			if($picWrap.css('left') == '0px' && !param.isInfinit){
				$(elem).find('.xpy-slide-btn-left').addClass('forbidden');
			}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
				$(elem).find('.xpy-slide-btn-right').addClass('forbidden');
			}else{
				$(elem).find('.xpy-slide-btn-left').removeClass('forbidden');
				$(elem).find('.xpy-slide-btn-right').removeClass('forbidden');
			}
			flag = true;
		})		
	}	
}


function slideLeftMove(elem,param,SlideMoveCount){
	var items = $(elem).find('.xpy-slide-img-item');
	var width = items.length*param.showImgContentWidth;
	var $picWrap =$(elem).find('.xpy-slide-img-hold').eq(0),
		$picItems = $picWrap.find('.xpy-slide-img-item');
	var left = param.slideLength*param.showImgContentWidth;

	if(flag){
		flag = false;
		if($picWrap.css('left') == '0px'){
			var circleHtml = '<ul class="xpy-slide-img-hold clearfix" id="xpy-slide-wrapper'+SlideMoveCount+'">'+imgItemHtml+'</ul>';
			$(elem).find('.xpy-slide-wrapper').append(circleHtml);
			$(elem).find('.xpy-slide-img-hold').eq(1).width(width).css({'left': -$picWrap.width()});
			$(elem).find('.xpy-slide-img-item').width(param.showImgContentWidth-1);
			$picWrap.animate({
				'left': parseInt($picWrap.css('left')) + left
			},function(){
				$picWrap.remove();
				flag = true;
			})
			$(elem).find('.xpy-slide-img-hold').eq(1).animate({
				'left': parseInt($(elem).find('.xpy-slide-img-hold').eq(1).css('left')) + left
			})
			
		}
		$picWrap.animate({
			'left': parseInt($picWrap.css('left')) + left
		},function(){
			if($picWrap.css('left') == '0px' && !param.isInfinit){
				$(elem).find('.xpy-slide-btn-left').addClass('forbidden');
			}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
				$(elem).find('.xpy-slide-btn-right').addClass('forbidden');
			}else{
				$(elem).find('.xpy-slide-btn-left').removeClass('forbidden');
				$(elem).find('.xpy-slide-btn-right').removeClass('forbidden');
			}
			flag = true;
		})		
	}
	
}