define(['assets/js/index/first_head_title.js',
	'assets/js/index/second_head_title.js',
	'assets/js/index/third_head_title.js',
	'assets/js/index/whole_type_select.js',
	'assets/js/index/jd_second_kill.js',
	],
	function(renderHeadAdApp, secondHeadTitleApp, thirdHeadTitleApp, wholeTypeSelectApp, jdSecondKillApp){
	var app = {
		init: function(){
			this.getStart();
			this.event();
			renderHeadAdApp.init();
			secondHeadTitleApp.init();
			thirdHeadTitleApp.init();
			wholeTypeSelectApp.init();
			jdSecondKillApp.init();
		},
		getStart: function(){
			
		},
		event: function(){			

		}

	};
	return app;
})