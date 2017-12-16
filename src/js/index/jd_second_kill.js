define(['assets/js/common/model.js',
		'viewTpl/jdSecondKill/jd_second_kill'
	],function(modelApp, jdSecondKillTpl){
	var jdSecondKillApp = {
		init: function(){
			this._renderSecondKill();
			this._event();
		},
		_renderSecondKill: function(){
			modelApp.getJdSecondKillInfo().then(function(res){
				if(res.meta.status == 200){
					var carouselImg = res.data.carouselImg;
					var slideImg = res.data.slideImg;
					//渲染京东秒杀部分的右侧轮播图片
					$('.second-kill-content-right').carousel({
						'data': carouselImg,
						'isSkip': true,
						'isInfinit': true,
						'isSlide': false,
						'isBtn': false,
						'skipTrigger': 'hover',
						'slideTime': 3000
					})
					//渲染京东秒杀的左侧滑动图片
					$('.second-kill-content-left').slideMove({
						'data': slideImg,
						'isInfinit': true,
						'rubberBanding': true,
						'slideLength': 5,
						'showLength': 5,
						'showImgContentWidth': 200
					})
				}
			})

		},
		_event: function(){
		}
	};
	return jdSecondKillApp;
})