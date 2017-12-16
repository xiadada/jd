define(['assets/js/common/model.js',
	'assets/js/data/index/wholeTypeSelect/left_bar_type_select.js',
	'viewTpl/wholeTypeSelect/all_type_select'],
	function(modelApp, leftBarTypeApp, allTypeSelectTpl){
		var wholeTypeSelectApp = {
			init: function(){
				this._renderWholeType();
				this._event();
			},
			_renderWholeType: function(){
				var wholeData = {}; 
				$.when(modelApp.getCenterImg(), modelApp.getRightNews())
				.done(function(res1, res2){
					var res1 = res1[0],
						res2 = res2[0];
					if(res1.meta.status == 200 && res2.meta.status == 200){
						wholeData.leftTypeSelect = leftBarTypeApp.wholeTypeSelect;
						wholeData.cnterSlideImg = res1.data.headSlideImg;
						wholeData.centerTwoImg = res1.data.twoImgSelect;

						wholeData.rightDiscountNews = res2.data.discountNews;
						wholeData.rightNoticeNews = res2.data.noticeNews;
						wholeData.rightPlayItem = res2.data.playItem;
						
						$('.all-type-select').html(allTypeSelectTpl(wholeData));

						// 渲染轮播图
						$('.all-type-select .img-slide').carousel({
							'data': wholeData.cnterSlideImg,
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
				/*
				*促销、公告内容转换
				*/
				$('.all-type-select').on('mouseover','.news-title',function(){
					var typeValue = $(this).data('value');
					if(typeValue == "promotion"){
						$('.all-type-select .news-select-action').css({
							'transform': 'translateX(0)',
							'transition': 'transform .3s ease,-webkit-transform .3s ease'
						})
						$('.all-type-select .discount-content-detail').show();
						$('.all-type-select .notice-content-detail').hide();
					}else if(typeValue == "notice"){
						$('.all-type-select .news-select-action').css({
							'transform': 'translateX(52px)',
							'transition': 'transform .3s ease,-webkit-transform .3s ease'
						})
						$('.all-type-select .discount-content-detail').hide();
						$('.all-type-select .notice-content-detail').show();
					}
				});

			}
		};
		return wholeTypeSelectApp;

})