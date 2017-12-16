define(['assets/js/common/model.js',
		'viewTpl/firstHead/first_head_title'
	],function(modelApp, firstHeadTitleTpl){
	var renderHeadAdApp = {
		init: function(){
			this._renderHeaderAd();
			this._event();
		},
		/*
		*渲染头部的广告
		*/
		_renderHeaderAd: function(){
			//获取广告信息
			modelApp.getFirstHeadAd().then(function(res){
				if(res.meta.status == 200){
					$('.first-head-title').css({
						'backgroundColor': res.data.themeColor
					}).html(firstHeadTitleTpl(res.data));
				}else{
					$('.first-head-title').remove();
				}
			})
		},
		_event: function(){
			//点击头部广告的叉号
			$('.first-head-title').on('click','.ad-close',function(){
				$('.first-head-title').fadeOut(function(){
					$('.second-head-title').css({
						'margin-top': '80px'
					}).animate({
						'margin-top': '0'
					})
				})
			})
		}

	};
	return renderHeadAdApp;
})