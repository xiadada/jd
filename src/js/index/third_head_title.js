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
					//初始化购物车商品的数量
					modelApp.getBuyCarCount().then(function(res){
						if(res.meta.status == 200){
							$('.buy-car .buy-car-count').html(res.data.count);
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