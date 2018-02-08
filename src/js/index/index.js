define(['assets/js/common/model.js',
	'assets/js/index/first_head_title.js',
	'assets/js/index/second_head_title.js',
	'assets/js/index/third_head_title.js',
	'assets/js/index/whole_type_select.js',
	'assets/js/index/jd_second_kill.js',
	'assets/js/index/enjoy_quality.js'
	],
	function(modelApp, renderHeadAdApp, secondHeadTitleApp, thirdHeadTitleApp, wholeTypeSelectApp, jdSecondKillApp, enjoyQualityApp){
	var app = {
		init: function(){
			renderHeadAdApp.init();
			secondHeadTitleApp.init();
			thirdHeadTitleApp.init();
			wholeTypeSelectApp.init();
			jdSecondKillApp.init();
			enjoyQualityApp.init();
			this.getStart();
			this.event();
		},
		getStart: function(){
			//渲染快速搜索框
			modelApp.getAllExistingData().then(function(res){
				if(res.meta.status == 200){
					var placeholderText = res.data.hotSearch.text;
					var allExistingData = res.data.allExistingData;
					$('.search-inner').associativeSearch({
						"data": allExistingData,
						"cameraIcon": "/assets/images/index/header_search_camera.png",
						"searchIcon": "/assets/images/index/header_search_btn.png",
						"placeholder": placeholderText
					})
				}
			})
		},
		event: function(){			
			$(window).on('scroll',function(){
				var scrollTop = $(window).scrollTop();
				if(scrollTop >= 600){
					$('.search-inner-hold').slideDown();
				}else{
					$('.search-inner-hold').hide();
				}

			})
		}

	};
	return app;
})