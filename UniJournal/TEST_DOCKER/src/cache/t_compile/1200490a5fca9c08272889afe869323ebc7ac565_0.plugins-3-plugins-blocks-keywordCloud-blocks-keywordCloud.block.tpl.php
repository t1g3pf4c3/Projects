<?php
/* Smarty version 3.1.34-dev-7, created on 2021-09-24 10:48:48
  from 'plugins-3-plugins-blocks-keywordCloud-blocks-keywordCloud:block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_614dad109467e2_64106231',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1200490a5fca9c08272889afe869323ebc7ac565' => 
    array (
      0 => 'plugins-3-plugins-blocks-keywordCloud-blocks-keywordCloud:block.tpl',
      1 => 1625484254,
      2 => 'plugins-3-plugins-blocks-keywordCloud-blocks-keywordCloud',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_614dad109467e2_64106231 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div class="pkp_block block_Keywordcloud">
	<span class="title"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.block.keywordCloud.title"),$_smarty_tpl ) );?>
</span>
	<div class="content" id='wordcloud'></div>

	<?php echo '<script'; ?>
>
	function randomColor() {
		var cores = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
		return cores[Math.floor(Math.random()*cores.length)];
	}

	document.addEventListener("DOMContentLoaded", function() {
		var keywords = <?php echo $_smarty_tpl->tpl_vars['keywords']->value;?>
;
		var totalWeight = 0;
		var width = 300;
		var height = 200;
		var transitionDuration = 200;	
		var length_keywords = keywords.length;
		var layout = d3.layout.cloud();

		layout.size([width, height])
			.words(keywords)
			.fontSize(function(d)
			{
				return fontSize(+d.size);
			})
			.on('end', draw);
		
		var svg = d3.select("#wordcloud").append("svg")
			.attr("viewBox", "0 0 " + width + " " + height)	
			.attr("width", '100%');		
		
		function update() {
			var words = layout.words();
			fontSize = d3.scaleLinear().range([16, 34]);
			if (words.length) {
				fontSize.domain([+words[words.length - 1].size || 1, +words[0].size]);
			}
		}
		
		keywords.forEach(function(item,index){totalWeight += item.size;});

		update();

		function draw(words, bounds) {
			var w = layout.size()[0],
                h = layout.size()[1];

			scaling = bounds
                ? Math.min(
                      w / Math.abs(bounds[1].x - w / 2),
                      w / Math.abs(bounds[0].x - w / 2),
                      h / Math.abs(bounds[1].y - h / 2),
                      h / Math.abs(bounds[0].y - h / 2),
                  ) / 2
                : 1;

			svg
			.append("g")
			.attr(
                "transform",
                "translate(" + [w >> 1, h >> 1] + ")scale(" + scaling + ")",
            )
			.selectAll("text")
				.data(words)
			.enter().append("text")
				.style("font-size", function(d) { return d.size + "px"; })
				.style("font-family", 'serif')
				.style("fill", randomColor)
				.style('cursor', 'pointer')
				.style('opacity', 0.7)
				.attr('class', 'keyword')
				.attr("text-anchor", "middle")
				.attr("transform", function(d) {
					return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
				}) 
				.text(function(d) { return d.text; })
				.on("click", function(d, i){
					window.location = "<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('router'=>@constant('ROUTE_PAGE'),'page'=>"search",'query'=>"QUERY_SLUG"),$_smarty_tpl ) );?>
".replace(/QUERY_SLUG/, encodeURIComponent(''+d.text+''));
				})
				.on("mouseover", function(d, i) {
					d3.select(this).transition()
						.duration(transitionDuration)
						.style('font-size',function(d) { return (d.size + 3) + "px"; })
						.style('opacity', 1);
				})
				.on("mouseout", function(d, i) {
					d3.select(this).transition()
						.duration(transitionDuration)
						.style('font-size',function(d) { return d.size + "px"; })
						.style('opacity', 0.7);
				})
				.on('resize', function() { update() });
		}

		layout.start();

	});

	<?php echo '</script'; ?>
>
</div><?php }
}
