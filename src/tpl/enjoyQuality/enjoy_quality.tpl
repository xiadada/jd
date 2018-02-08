<div class="enjoy-quality-hold">
	<div class="enjoy-quality-title">
		<div class="enjoy-quality-title-content">
			<h3>享品质</h3>
		</div>
	</div>
	<div class="enjoy-quality-content-hold">
		<ul class="enjoy-quality-content">
			{{each $data.enjoyQualityContent as value index}}
				{{if index == 0}}
					<li class="entry-item live-show">
						<div class="live-show-content-hold">
							<div class="live-show-title"></div>
							<div class="live-show-content"></div>
						</div>					
					</li>
				{{else}}				
					<li class="entry-item entry-item-{{value.index}}">
						<a href="{{value.href}}" class="entry-lk J-log">
							<div class="entry-bg" style="background: {{value.background}}">
								<div class="entry-info">
									<h4 class="entry-info-title">{{value.entryInfoTitle}}</h4>
									<p class="entry-info-desc">{{value.entryInfoDesc}}</p>
								</div>
							</div>
							<img src="{{value.imgUrl}}" alt="" class="entry-img">
						</a>
					</li>
				{{/if}}
			{{/each}}
		</ul>
	</div>
</div>