define(['assets/js/common/model.js',
	'assets/js/data/index/second_head_address_data.js',
	'viewTpl/secondHead/second_head',
	'viewTpl/secondHead/local_address',
	'viewTpl/secondHead/my_jd',
	'viewTpl/secondHead/customer_service',
	'viewTpl/secondHead/website_nav',
	'viewTpl/secondHead/phone_jd'],
	function(modelApp, secondHeadDataApp, secondHeadTpl, localAddressTpl, myJdTpl, customerServiceTpl, websiteNavTpl,phoneJdTpl){
		var secondHeadTitleApp = {
			init: function(){
				this._renderSecondHead();
				this._event();
			},
			/*
			*渲染second_head_title部分信息
			*/
			_renderSecondHead: function(){
				//获取到当前的地址信息
				modelApp.getCurrentAddr().then(function(res){
					if(res.meta.status == 200){
						var secondHeadData = {
							'currentAddress':{
								'text': res.data.currentProvince,
								'code': res.data.provinceCode
							},
							'secondHeadInfoData': [{
								'text': '您好，请登录',
								'comment': '免费注册',
								'className': 'user-login-sign'
							},{
								'text': '我的订单',
							},{
								'text': '我的京东',
								'className': 'my-jd',
								'hasDropdown': true
							},{
								'text': '京东会员',
							},{
								'text': '企业采购',
							},{
								'text': '客户服务',
								'className': 'customer-service',
								'hasDropdown': true
							},{
								'text': '网站导航',
								'className': 'website-nav',
								'hasDropdown': true
							},{
								'text': '手机京东',
								'className': 'shortcut-telephone-version'
							}]
						}
						$('.lala').html(secondHeadTpl(secondHeadData));
						$('.all-place').append(localAddressTpl(secondHeadDataApp));
						$('.my-jd').append(myJdTpl());
						$('.customer-service').append(customerServiceTpl());
						$('.website-nav').append(websiteNavTpl());
					}
				})
			},
			_event: function(){
				/*
				*地址展开收起
				*/
				$('.lala').on('mouseenter','.local-place-content',function(){
					var currentProvinceCode = $(this).attr('data-code');
					console.log(currentProvinceCode);
					$(this).siblings('.all-place').find('li[data-code="'+currentProvinceCode+'"]').addClass('action').siblings().removeClass('action');
					$(this).css({
						'background-color': '#fff',
		        		'border': '1px solid #CCCCCC',
		        		'border-bottom': '1px solid transparent'
		        	})
		        	$(this).siblings('.all-place').show();		        
				}).on('mouseleave','.local-place-content',function(){
					$(this).css({
						'background-color': '#e3e4e5',
		        		'border': '1px solid transparent'
					})
					$(this).siblings('.all-place').hide();
				})
				$('.lala').on('mouseenter','.all-place',function(){
					$(this).siblings('.local-place-content').css({
						'background-color': '#fff',
		        		'border': '1px solid #CCCCCC',
		        		'border-bottom': '1px solid transparent'
		        	})
		        	$(this).show();		        
				}).on('mouseleave','.all-place',function(){
					$(this).siblings('.local-place-content').css({
						'background-color': '#e3e4e5',
		        		'border': '1px solid transparent'
					})
					$(this).hide();
				})
				/*
				*地址选择
				*/
				$('.lala').on('click','.local-place-item',function(){
					$(this).closest('.all-place').hide();
					if(!$(this).hasClass('action')){
						var curProvinceCode = $(this).attr('data-code');
						$(this).closest('.all-place').siblings('.local-place-content').attr('data-code',curProvinceCode);
						$(this).addClass('action').siblings().removeClass('action');						
						var localPlace = $(this).html();
						$(this).closest('.all-place').siblings('.local-place-content').attr('title',localPlace).html(localPlace);
						$(this).closest('.all-place').hide();
					}					
				})
				/*
				*我的京东、客户服务、网站导航下拉框展开收起
				*/
				$('.second-head-title').on('mouseover','.dropdownLi',function(){
					$(this).find('.has-dropdown').css({
						'border': '1px solid #CCCCCC',
						'background-color': '#ffffff'
					})
					$(this).find('.has-dropdown').siblings().show();
				}).on('mouseout','.dropdownLi',function(){
					$(this).find('.has-dropdown').css({
						'border': '1px solid transparent',
						'background-color': '#e3e4e5'
					})
					$(this).find('.has-dropdown').siblings().hide();
				})
			}

		};
		return secondHeadTitleApp;
})
