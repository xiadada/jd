<div class="all-type-select-content clearfix">
<div class="cols col-left">
	<ul class="col-left-content">
		{{each $data.leftTypeSelect as value}}
			<li class="col-left-content-item" data-index="{{value.index}}">
				{{each value.detail as item index}}
					<a href="{{item.url}}">{{item.text}}</a>
					<span class="type-split">{{if index != value.detail.length-1}}/{{/if}}</span>

				{{/each}}
			</li>
		{{/each}}
	</ul>
</div>
<div class="cols col-center">
	<div class="img-slide"></div>
	<div class="two-img-select clearfix">
		{{each $data.centerTwoImg as value}}
		<div class="img-select-item">
			<a href="{{value.href}}">
				<img src="{{value.url}}">
			</a>
		</div>
		{{/each}}
	</div>
	
</div>
<div class="cols col-right">
	<!--用户头像登录注册-->
	<div class="user-info">
		<div class="user-photo">
			<div class="user-photo-icon">
				<img src="assets/images/index/article_sidebar_login_profile.png" alt="">
				<a href="#"></a>
			</div>
			<div class="user-photo-text">
				<p>Hi，欢迎来到京东!</p>
				<p>
					<a href="" class="user-login">登录</a>
					<a href="" class="user-sign">注册</a>
				</p>
			</div>
		</div>
		<div class="user-expend-info clearfix">
			<a href="" class="new-user-welfare">新人福利</a>
			<a href="" lass="plus-members">PLUS会员</a>
		</div>
	</div>
	<!--促销、公告、更多-->
	<div class="discount-info">
		<div class="discount-info-content">
			<div class="discount-info-content-head">
				<div class="news-select-action"></div>
				<a href="" class="news-title promotion" data-value="promotion">促销</a>
				<a href="" class="news-title notice" data-value="notice">公告</a>
				<a href="" class="news-title more">更多</a>
			</div>
			<div class="info-content-detail">
				<ul class="content-detail discount-content-detail">
					{{each $data.rightDiscountNews as value}}
						<li class="content-detail-item"><a href="{{value.href}}">{{value.text}}</a></li>
					{{/each}}
				</ul>
				<ul class="content-detail notice-content-detail">
					{{each $data.rightNoticeNews as value}}
						<li class="content-detail-item"><a href="{{value.href}}">{{value.text}}</a></li>
					{{/each}}
				</ul>
			</div>
		</div>
	</div>
	<!--火车票、酒店等衣食住行,吃喝玩乐项目-->
	<div class="play-item">
		<ul class="play-item-content clearfix">
			{{each $data.rightPlayItem as value}}
				<li class="play-item-detail">
					{{if value.discountIcon}}
						<span class="icon-tag">{{value.discountIcon}}</span>
					{{/if}}
					<a href="{{value.href}}">
						<i class="play-item-icon" style="background-position: {{value.playItemIcon}}"></i>
						<span class="play-item-describe">{{value.playItemDescribe}}</span>
					</a>
				</li>
			{{/each}}
		</ul>
	</div>	
</div>
</div>