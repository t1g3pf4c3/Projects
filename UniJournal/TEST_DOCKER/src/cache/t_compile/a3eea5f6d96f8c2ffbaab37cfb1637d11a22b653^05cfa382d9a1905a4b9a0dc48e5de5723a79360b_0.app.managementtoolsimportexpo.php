<?php
/* Smarty version 3.1.34-dev-7, created on 2021-09-27 12:37:22
  from 'app:managementtoolsimportexpo' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_6151bb02a32cf8_71916587',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '05cfa382d9a1905a4b9a0dc48e5de5723a79360b' => 
    array (
      0 => 'app:managementtoolsimportexpo',
      1 => 1611740175,
      2 => 'app',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6151bb02a32cf8_71916587 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="pkp_page_content pkp_page_importexport_plugins">
	<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['help'][0], array( array('file'=>"tools",'class'=>"pkp_help_tab"),$_smarty_tpl ) );?>


	<ul>
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['plugins']->value, 'plugin');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['plugin']->value) {
?>
		<li><a href="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('op'=>"importexport",'path'=>call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'to_array' ][ 0 ], array( "plugin",$_smarty_tpl->tpl_vars['plugin']->value->getName() ))),$_smarty_tpl ) );?>
"><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['plugin']->value->getDisplayName() ));?>
</a>:&nbsp;<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['plugin']->value->getDescription() ));?>
</li>
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
	</ul>
</div>
<?php }
}
