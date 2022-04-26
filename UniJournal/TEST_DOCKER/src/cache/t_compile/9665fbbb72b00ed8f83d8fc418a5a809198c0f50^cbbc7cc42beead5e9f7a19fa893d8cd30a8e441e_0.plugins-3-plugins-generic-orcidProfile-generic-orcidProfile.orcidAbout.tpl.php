<?php
/* Smarty version 3.1.34-dev-7, created on 2021-10-04 06:21:03
  from 'plugins-3-plugins-generic-orcidProfile-generic-orcidProfile:orcidAbout.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_615a9d4fa210a5_23994658',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cbbc7cc42beead5e9f7a19fa893d8cd30a8e441e' => 
    array (
      0 => 'plugins-3-plugins-generic-orcidProfile-generic-orcidProfile:orcidAbout.tpl',
      1 => 1625484471,
      2 => 'plugins-3-plugins-generic-orcidProfile-generic-orcidProfile',
    ),
  ),
  'includes' => 
  array (
    'app:frontend/components/header.tpl' => 1,
    'app:frontend/components/breadcrumbs.tpl' => 1,
    'app:frontend/components/footer.tpl' => 1,
  ),
),false)) {
function content_615a9d4fa210a5_23994658 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("app:frontend/components/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<div class="page page_message">
	<?php $_smarty_tpl->_subTemplateRender("app:frontend/components/breadcrumbs.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('currentTitleKey'=>"plugins.generic.orcidProfile.about.title"), 0, false);
?>
	<h2>
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.title"),$_smarty_tpl ) );?>

	</h2>
	<div class="description">
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.orcidExplanation"),$_smarty_tpl ) );?>

	</div>
	<h3><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.howAndWhy.title"),$_smarty_tpl ) );?>
</h3>
	<?php if ($_smarty_tpl->tpl_vars['isMemberApi']->value) {?>
	<div class="description">
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.howAndWhyMemberAPI"),$_smarty_tpl ) );?>

	</div>
	<?php } else { ?>
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.howAndWhyPublicAPI"),$_smarty_tpl ) );?>

	<?php }?>
	<h3><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.display.title"),$_smarty_tpl ) );?>
</h3>
	<div class="description">
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"plugins.generic.orcidProfile.about.display"),$_smarty_tpl ) );?>

	</div>
</div>

<?php $_smarty_tpl->_subTemplateRender("app:frontend/components/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}
