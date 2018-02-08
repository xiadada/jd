define(['assets/js/common/model.js',
	'viewTpl/thirdHead/third_head_title'],function(modelApp, thirdHeadTitleTpl){
	var thirdHeadTitleApp = {
		init: function(){
			this._renderThirdHeadTitle();
		},
		_renderThirdHeadTitle: function(){
			//获取第三头部信息，包括搜索框内容和搜索框下面的快速访问内容
			modelApp.getThirdHeadInfo().then(function(res){
				if(res.meta.status == 200){
					$('.third-head-title').append(thirdHeadTitleTpl(res.data));
					//渲染快速搜索框
					modelApp.getAllExistingData().then(function(aed){
						if(aed.meta.status == 200){
							var placeholderText = aed.data.hotSearch.text;
							// var allExistingData = aed.data.allExistingData;
							$('.search-area').associativeSearch({
								"data": [],
								"cameraIcon": "/assets/images/index/header_search_camera.png",
								"searchIcon": "/assets/images/index/header_search_btn.png",
								"placeholder": placeholderText
							})
							$('input[type="text"]').on('input propertychange', function(){
								var currentValue = $.trim($(this).val());
								var $script = $('#jsonpScript');
								if($script.length != 0) $script.remove();
				
								var scriptHtml = '<script id="jsonpScript" src="http://suggestion.baidu.com/su?wd=' + currentValue + '&cb=func&qq-pf-to=pcqq.c2c"><\/script>';
								$(scriptHtml).appendTo('body');
							})
						}
					})
					//初始化购物车商品的数量
					modelApp.getBuyCarCount().then(function(bcc){
						if(bcc.meta.status == 200){
							$('.buy-car .buy-car-count').html(bcc.data.count);
						}
					})					
				}
			})			
		},
		_event: function(){
			//购物车商品的展开收起
		}

	};
	return thirdHeadTitleApp;
})
function func(res){
	data = [];
	data = res.s;
	$('.search-area').associativeSearchFn('data',data);
}