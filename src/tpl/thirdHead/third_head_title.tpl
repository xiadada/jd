<div class="third-head-title-content">
	<div class="logo"></div>
	<div class="search-hold">
		<input type="text" class="search" placeholder="{{$data.hotSearch.text}}">
		<div class="camera">
			<input type="file" title="未选择任何文件">
		</div>
		<div class="search-icon"></div>
	</div>
	<div class="buy-car">
		<i class="buy-car-logo"></i>
		<i class="buy-car-text">我的购物车</i>
		<i class="buy-car-count">0</i>
	</div>
	<div class="two-dimension-code"></div>

	<ul class="type-select clearfix">
		{{each $data.searchDaoHang as value index}}
			{{if index == 0}}
			<li><a href="#" class="action">{{value.text}}</a></li>
			{{else}}
			<li><a href="#">{{value.text}}</a></li>
			{{/if}}
		{{/each}}
	</ul>

	<div class="type-select-items clearfix">
		{{each $data.typeSelectItems as value index}}
			<ul class="clearfix">
				{{each value as items}}
					<li><a href="{{items.url}}">{{items.text}}</a></li>
				{{/each}}
			</ul>
			{{if index != $data.typeSelectItems.length-1}}
				<div class="split"></div>
			{{/if}}
		{{/each}}
	</div>							
</div>		