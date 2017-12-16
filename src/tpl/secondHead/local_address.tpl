{{each $data.location as value}}
	<li class="local-place-item" data-code="{{value.provinceCode}}">{{value.place}}</li>
{{/each}}