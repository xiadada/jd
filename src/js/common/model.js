define([],function(){
	var baseUrl = '/assets/js/data/';
	var modelApp = {
		/*
		*获取头部的广告信息
		*/
		getFirstHeadAd: function(){
			return $.ajax({
				url: baseUrl + 'index/firstHead/first_head_title.json'
			})
		},
		/*
		*获取到当前地址的接口
		*/
		getCurrentAddr: function(){
			return $.ajax({
				url: baseUrl + 'index/secondHead/current_address.json'
			})
		},
		/*
		*获取到搜索框下面的快速搜索内容
		*/
		getThirdHeadInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/thirdHead/third_head_title.json'
			})
		},
		/*
		*获取到搜索框中的placeholder中的文字和所有已存在的搜索内容
		*/
		getAllExistingData: function(){
			return $.ajax({
				url: baseUrl + 'index/thirdHead/search_all_existing_data.json'
			})
		},
		/*
		*获取到购物车商品的数量
		*/
		getBuyCarCount: function(){
			return $.ajax({
				url: baseUrl + 'index/thirdHead/init_buy_car_count.json'
			})
		},
		/*
		*获取到中间图片的信息
		*/
		getCenterImg: function(){
			return $.ajax({
				url: baseUrl + 'index/wholeTypeSelect/carousel_img.json'
			})
		},
		/*
		*获取到右侧新闻的信息
		*/
		getRightNews: function(){
			return $.ajax({
				url: baseUrl + 'index/wholeTypeSelect/right_news_detail.json'
			})
		},
		/*
		*获取到京东秒杀的倒计时和图片信息
		*/
		getJdSecondKillInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/jdSecondKill/jd_second_kill.json'
			})
		},
		/*
		*获取到享品质信息
		*/
		getEnjoyQualityInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/enjoyQuality/enjoy_quality.json'
			})
		},
	};
	return modelApp;
})