<?php
/* Smarty version 3.1.34-dev-7, created on 2021-10-01 22:37:08
  from 'plugins-3-plugins-generic-webFeed-generic-webFeed:rss.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_61578d94643c20_03221599',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '997bb5a5d4431a7325178aca6a9420c5f2562dae' => 
    array (
      0 => 'plugins-3-plugins-generic-webFeed-generic-webFeed:rss.tpl',
      1 => 1611743678,
      2 => 'plugins-3-plugins-generic-webFeed-generic-webFeed',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_61578d94643c20_03221599 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/var/www/ojs/lib/pkp/lib/vendor/smarty/smarty/libs/plugins/modifier.replace.php','function'=>'smarty_modifier_replace',),1=>array('file'=>'/var/www/ojs/lib/pkp/lib/vendor/smarty/smarty/libs/plugins/modifier.date_format.php','function'=>'smarty_modifier_date_format',),));
echo '<?xml ';?>
version="1.0" encoding="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['defaultCharset']->value ));?>
"<?php echo '?>';?>

<rdf:RDF
	xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	xmlns="http://purl.org/rss/1.0/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:prism="http://prismstandard.org/namespaces/1.2/basic/"
	xmlns:cc="http://web.resource.org/cc/">

	<channel rdf:about="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('journal'=>$_smarty_tpl->tpl_vars['journal']->value->getPath()),$_smarty_tpl ) );?>
">
				<title><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['journal']->value->getLocalizedName()),"html" ));?>
</title>
		<link><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('journal'=>$_smarty_tpl->tpl_vars['journal']->value->getPath()),$_smarty_tpl ) );?>
</link>

		<?php if ($_smarty_tpl->tpl_vars['journal']->value->getLocalizedDescription()) {?>
			<?php $_smarty_tpl->_assignInScope('description', $_smarty_tpl->tpl_vars['journal']->value->getLocalizedDescription());?>
		<?php } elseif ($_smarty_tpl->tpl_vars['journal']->value->getLocalizedData('searchDescription')) {?>
			<?php $_smarty_tpl->_assignInScope('description', $_smarty_tpl->tpl_vars['journal']->value->getLocalizedData('searchDescription'));?>
		<?php }?>

		<description><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['description']->value),"html" ));?>
</description>

				<?php $_smarty_tpl->_assignInScope('publisherInstitution', $_smarty_tpl->tpl_vars['journal']->value->getData('publisherInstitution'));?>
		<?php if ($_smarty_tpl->tpl_vars['publisherInstitution']->value) {?>
			<dc:publisher><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['publisherInstitution']->value),"html" ));?>
</dc:publisher>
		<?php }?>

		<?php if ($_smarty_tpl->tpl_vars['journal']->value->getPrimaryLocale()) {?>
			<dc:language><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',smarty_modifier_replace($_smarty_tpl->tpl_vars['journal']->value->getPrimaryLocale(),'_','-')),"html" ));?>
</dc:language>
		<?php }?>

		<prism:publicationName><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['journal']->value->getLocalizedName()),"html" ));?>
</prism:publicationName>

		<?php if ($_smarty_tpl->tpl_vars['journal']->value->getData('printIssn')) {?>
			<?php $_smarty_tpl->_assignInScope('ISSN', $_smarty_tpl->tpl_vars['journal']->value->getData('printIssn'));?>
		<?php } elseif ($_smarty_tpl->tpl_vars['journal']->value->getData('onlineIssn')) {?>
			<?php $_smarty_tpl->_assignInScope('ISSN', $_smarty_tpl->tpl_vars['journal']->value->getData('onlineIssn'));?>
		<?php }?>

		<?php if ($_smarty_tpl->tpl_vars['ISSN']->value) {?>
			<prism:issn><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['ISSN']->value ));?>
</prism:issn>
		<?php }?>

		<?php if ($_smarty_tpl->tpl_vars['journal']->value->getLocalizedData('licenseTerms')) {?>
			<prism:copyright><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['journal']->value->getLocalizedData('licenseTerms')),"html" ));?>
</prism:copyright>
		<?php }?>

		<items>
			<rdf:Seq>
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['publishedSubmissions']->value, 'section', false, 'sectionId', 'sections', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['sectionId']->value => $_smarty_tpl->tpl_vars['section']->value) {
?>
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['section']->value['articles'], 'article');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['article']->value) {
?>
					<rdf:li rdf:resource="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('page'=>"article",'op'=>"view",'path'=>$_smarty_tpl->tpl_vars['article']->value->getBestId()),$_smarty_tpl ) );?>
"/>
				<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>			<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>			</rdf:Seq>
		</items>
	</channel>

<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['publishedSubmissions']->value, 'section', false, 'sectionId', 'sections', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['sectionId']->value => $_smarty_tpl->tpl_vars['section']->value) {
?>
	<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['section']->value['articles'], 'article');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['article']->value) {
?>
		<?php $_smarty_tpl->_assignInScope('publication', $_smarty_tpl->tpl_vars['article']->value->getCurrentPublication());?>
		<item rdf:about="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('page'=>"article",'op'=>"view",'path'=>$_smarty_tpl->tpl_vars['article']->value->getBestId()),$_smarty_tpl ) );?>
">

						<title><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['article']->value->getLocalizedTitle()),"html" ));?>
</title>
			<link><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('page'=>"article",'op'=>"view",'path'=>$_smarty_tpl->tpl_vars['article']->value->getBestId()),$_smarty_tpl ) );?>
</link>

						<?php if ($_smarty_tpl->tpl_vars['article']->value->getLocalizedAbstract()) {?>
				<description><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['article']->value->getLocalizedAbstract()),"html" ));?>
</description>
			<?php }?>

			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['article']->value->getAuthors(), 'author', false, NULL, 'authorList', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['author']->value) {
?>
				<dc:creator><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( preg_replace('!\s+!u', ' ',$_smarty_tpl->tpl_vars['author']->value->getFullName(false)),"html" ));?>
</dc:creator>
			<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>

			<dc:rights>
				<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"submission.copyrightStatement",'copyrightYear'=>$_smarty_tpl->tpl_vars['article']->value->getCopyrightYear(),'copyrightHolder'=>$_smarty_tpl->tpl_vars['article']->value->getLocalizedCopyrightHolder()),$_smarty_tpl ) ) ));?>

				<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['article']->value->getLicenseURL() ));?>

			</dc:rights>
			<?php if (($_smarty_tpl->tpl_vars['publication']->value->getData('accessStatus') == @constant('ARTICLE_ACCESS_OPEN') || ($_smarty_tpl->tpl_vars['publication']->value->getData('accessStatus') == @constant('ARTICLE_ACCESS_ISSUE_DEFAULT') && $_smarty_tpl->tpl_vars['issue']->value->getAccessStatus() == @constant('ISSUE_ACCESS_OPEN'))) && $_smarty_tpl->tpl_vars['article']->value->isCCLicense()) {?>
				<cc:license rdf:resource="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['article']->value->getLicenseURL() ));?>
" />
			<?php } else { ?>
				<cc:license></cc:license>
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['article']->value->getDatePublished()) {?>
				<dc:date><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['article']->value->getDatePublished(),"%Y-%m-%d");?>
</dc:date>
				<prism:publicationDate><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['article']->value->getDatePublished(),"%Y-%m-%d");?>
</prism:publicationDate>
			<?php }?>
			<?php if ($_smarty_tpl->tpl_vars['issue']->value->getVolume() && $_smarty_tpl->tpl_vars['issue']->value->getShowVolume()) {?><prism:volume><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['issue']->value->getVolume() ));?>
</prism:volume><?php }?>
			<?php if ($_smarty_tpl->tpl_vars['issue']->value->getNumber() && $_smarty_tpl->tpl_vars['issue']->value->getShowNumber()) {?><prism:number><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['issue']->value->getNumber() ));?>
</prism:number><?php }?>

			<?php if ($_smarty_tpl->tpl_vars['article']->value->getPages()) {?>
				<?php if ($_smarty_tpl->tpl_vars['article']->value->getStartingPage()) {?>
					<prism:startingPage><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['article']->value->getStartingPage() ));?>
</prism:startingPage>
				<?php }?>
				<?php if ($_smarty_tpl->tpl_vars['article']->value->getEndingPage()) {?>
					<prism:endingPage><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['article']->value->getEndingPage() ));?>
</prism:endingPage>
				<?php }?>
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['article']->value->getStoredPubId('doi')) {?>
				<prism:doi><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['article']->value->getStoredPubId('doi') ));?>
</prism:doi>
			<?php }?>
		</item>
	<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
</rdf:RDF>
<?php }
}
