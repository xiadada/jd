define(['assets/js/common/model.js',
	'assets/js/common/tool.js',
	'viewTpl/jdSecondKill/jd_second_kill'
	],function(modelApp, toolApp, jdSecondKillTpl){
	var countdownTimer;
	var jdSecondKillApp = {
		init: function(){
			this._renderSecondKill();
			this._secKillCountDown();
		},
		_renderSecondKill: function(callback){
			modelApp.getJdSecondKillInfo().then(function(res){
				if(res.meta.status == 200){

					var carouselImg = res.data.carouselImg;
					var slideImg = res.data.slideImg;
					var jdSecondKillData ={
						countDownHours: res.data.countdown[0],
						countDownMinutes: res.data.countdown[1],
						countDownSecond: res.data.countdown[2]
					}
					$('.jd-second-kill').html(jdSecondKillTpl(jdSecondKillData));
					//渲染京东秒杀右侧轮播图
					$('.second-kill-content-right').carousel({
						'data': carouselImg,
						'isSkip': true,
						'isInfinit': true,
						'isSlide': false,
						'isBtn': false,
						'skipTrigger': 'hover',
						'slideTime': 3000
					})
					//渲染京东秒杀左侧滑动图
					$('.second-kill-content-left').slideMove({
						'data': slideImg,
						'isInfinit': true,
						'rubberBanding': true,
						'slideLength': 5,
						'showLength': 5,
						'showImgContentWidth': 200
					})
					callback && callback();
				}
			})

		},
		_secKillCountDown: function(){
			clearInterval(countdownTimer);
			countdownTimer = setInterval(function(){
				var countDownHours = parseInt($('.time-hours').html()),
					countDownMinutes = parseInt($('.time-minute').html()),
					countDownSecond = parseInt($('.time-seconds').html());
					if(countDownSecond != 0){
						countDownSecond--;
						$('.time-seconds').html(toolApp._formatSingleDigit(countDownSecond));
					}else if(countDownSecond == 0 && countDownMinutes != 0){
						countDownMinutes--;
						$('.time-minute').html(toolApp._formatSingleDigit(countDownMinutes));
						$('.time-seconds').html('59');
					}else if(countDownHours !=0 && countDownSecond == 0 && countDownMinutes == 0){
						countDownHours--;
						$('.time-hours').html(toolApp._formatSingleDigit(countDownHours));
						$('.time-minute').html('59');
						$('.time-seconds').html('59');
					}else if(countDownHours == 0 && countDownMinutes == 0 && countDownSecond == 0){
						clearInterval(countdownTimer);
						jdSecondKillApp._renderSecondKill(function(){
							jdSecondKillApp._secKillCountDown();
						})
					}

			},1000);

		},
		_event: function(){

		}
	};
	return jdSecondKillApp;
})