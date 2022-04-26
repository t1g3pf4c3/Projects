<?php
/* Smarty version 3.1.34-dev-7, created on 2021-09-24 10:48:48
  from 'plugins-3-plugins-generic-customBlockManager-generic-customBlockManager:block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_614dad10954943_73423049',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'acbadd906ba21196ff6eba6bf708dd01ec09a2c0' => 
    array (
      0 => 'plugins-3-plugins-generic-customBlockManager-generic-customBlockManager:block.tpl',
      1 => 1611743678,
      2 => 'plugins-3-plugins-generic-customBlockManager-generic-customBlockManager',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_614dad10954943_73423049 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="pkp_block block_custom" id="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['customBlockId']->value ));?>
">
	<div class="content">
		<?php echo $_smarty_tpl->tpl_vars['customBlockContent']->value;?>

	</div>
</div>
<?php }
}
