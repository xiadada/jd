define(['assets/js/common/model.js',
	'viewTpl/enjoyQuality/enjoy_quality'],function(modelApp, enjoyQualityTpl){
	var enjoyQualityApp = {
		init: function(){
			this._renderEnjoyQuality();
			this._event();
		},
		_renderEnjoyQuality: function(){
			modelApp.getEnjoyQualityInfo().then(function(res){
				if(res.meta.status == '200'){
					$('.enjoy-quality').html(enjoyQualityTpl(res.data));
					//渲染轮播
					var rightCarouselLiveImgData = res.data.enjoyQualityContent[0].rightCarouselLiveImg;
					$('.live-show-content').carousel({
						'data': rightCarouselLiveImgData,
						'isSkip': true,
						'isInfinit': true,
						'isSlide': false,
						'skipTrigger': 'hover',
						'slideTime': 3000
					})
				}
			})

		},
		_event: function(){

		}
	};
	return enjoyQualityApp;
})