<div class="local-place">
	<div class="local-place-content" title="{{$data.currentAddress.text}}" data-code="{{$data.currentAddress.code}}">{{$data.currentAddress.text}}</div>
	<ul class="all-place clearfix"></ul>
</div>
<ul class="second-head-nav clearfix">
	{{each $data.secondHeadInfoData as value index}}
		{{if value.comment&&index == 0}}
			<li class="{{value.className}}">
				<a href="#" class="please-login">{{value.text}}</a>
				<a href="#" class="free-sign">{{value.comment}}</a>
			<li>
		{{else}}		
			<li class="{{if value.hasDropdown}}dropdownLi {{value.className}}{{/if}}">
				{{if value.hasDropdown}}
					<a href="" class="has-dropdown">{{value.text}} ∨</a>
					<div class="white-line"></div>
				{{else}}
					<a href="#">{{value.text}}</a>
				{{/if}}
			</li>
		{{/if}}
		{{if index != $data.secondHeadInfoData.length-1}}
			<li class="split"></li>
		{{/if}}
	{{/each}}
</ul>