<?php
/* Smarty version 3.1.34-dev-7, created on 2021-10-17 05:36:40
  from 'app:frontendcomponentsfooter.' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_616bb66880d5a4_53904487',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4dffb64063bb972c37e05619a2ccd9d0ea7473ac' => 
    array (
      0 => 'app:frontendcomponentsfooter.',
      1 => 1633604956,
      2 => 'app',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_616bb66880d5a4_53904487 (Smarty_Internal_Template $_smarty_tpl) {
?>
</main>

<?php if (empty($_smarty_tpl->tpl_vars['isFullWidth']->value)) {
$_smarty_tpl->smarty->ext->_capture->open($_smarty_tpl, 'default', "sidebarCode", null);
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['call_hook'][0], array( array('name'=>"Templates::Common::Sidebar"),$_smarty_tpl ) );
$_smarty_tpl->smarty->ext->_capture->close($_smarty_tpl);
if ($_smarty_tpl->tpl_vars['sidebarCode']->value) {?>
<aside id="sidebar" class="pkp_structure_sidebar left col-xs-12 col-sm-2 col-md-4" role="complementary"
	aria-label="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>" common.navigation.sidebar"),$_smarty_tpl ) ) ));?>
">
	<?php echo $_smarty_tpl->tpl_vars['sidebarCode']->value;?>

</aside><!-- pkp_sidebar.left -->
<?php }
}?>
</div><!-- pkp_structure_content -->
<div class="push"> </div>

</div><!-- pkp_structure_page -->
<footer class="footer" role="contentinfo">

	<div class="ft2">
		<div class="container ft2">
			<div class="col-md-3 col-xs-12" style=" text-align:center;">
				<a href="http://saudubna.ru/"><img style=" width:80px; text-align:center; " src="/files/isau.png"></a>
				<p style=" text-align:center;">  <a href="http://saudubna.ru/">ИНСТИТУТ СИСТЕМНОГО АНАЛИЗА И УПРАВЛЕНИЯ</a></p>
			</div>
			<div class="col-md-3 col-xs-12">
				<ul>
					<li> <a href="/index.php/SAU/about"> О ЖУРНАЛЕ </a> </li>
					<li> <a href="/index.php/SAU/issue/view"> ТЕКУЩИЙ ВЫПУСК </a> </li>
					<li> <a href="/index.php/SAU/issue/archive"> АРХИВ </a> </li>
				</ul>
			</div>
			<div class="col-md-5 col-xs-12">
				<ul >
					<li> <a href="http://saudubna.ru/conception"> ОБ ИСАУ </a></li>
					<li> <a href="https://uni-dubna.ru/sveden/FacultyPage?id=5ee2d240-86fb-400e-aa16-d48faeb7ad60"> КАФЕДРЫ </a> </li>
					<li> <a href="https://uni-dubna.ru/Entrance/Navigator">НАПРАВЛЕНИЯ </a></li>
					<li> <a href="http://www.saudubna.ru/students/spisok-pps">ПРЕПОДАВАТЕЛЬСКИЙ СОСТАВ </a> </li>
					<li> <a href="http://saudubna.ru/"> КОНТАКТЫ</a> </li>
				</ul>
			</div>
			<div style=" text-align:center;" class="col-md-1 col-xs-12">
				<button>
					<a href="#">
						<img src="/files/button.png"></a>
				</button>
			</div>
		</div>
	</div>
	<div class="ft1 ">
		<div class="container">
			<div class="ft1">
				<div class="sc">
					<a href="https://www.facebook.com/unidubnanews/"><img src="/files/facebook.svg"></a>
					<a href="https://vk.com/unidubna_official"><img src="/files/vk.svg"></a>
					<a href="https://twitter.com/unidubna_news"><img src="/files/twitter.svg"></a>
					<a href="https://www.instagram.com/unidubna_official"><img src="/files/instagram.svg"></a>
				</div>

				<div>
					<p> <a href="https://uni-dubna.ru/">www.uni-dubna.ru </a> </p>
				</div>

				<div>
					<a href="https://uni-dubna.ru/"> ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ "ДУБНА" </a>
					<img class="imgmain" src="/files/image.svg">
				</div>
			</div>
		</div> <!-- .row -->
	</div><!-- .container -->
</footer>

<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['load_script'][0], array( array('context'=>"frontend",'scripts'=>$_smarty_tpl->tpl_vars['scripts']->value),$_smarty_tpl ) );?>

<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['call_hook'][0], array( array('name'=>"Templates::Common::Footer::PageFooter"),$_smarty_tpl ) );?>

</body>

</html>

<style>
	.pkp_structure_content {
		margin-bottom: 20px;
	}

	html,
	body {
		height: 100%;
	}

	.pkp_structure_page {
		min-height: 100%;
		margin-bottom: -190px;
	}

	.push,
	footer {
		height: 190px;
	}

	footer {
		color: white;
		padding: 0 !important;
		margin-top: 0 !important;
		width: 100%;
	}

	.sc img {
		width: 24px;
		height: 24px;
		color: white;
		margin: 0 10px;
	}

	.imgmain {
		width: 40px;
		height: 40px;
	}

	.ft1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #58648e !important;
		color: white;
		height: 50px;
		line-height: 50px;
	}

	.ft2 {
		background: #ff6d00;
		padding: 1rem 0;
	}

	.ft2 button {
		padding: 0;
		margin-top: calc(50% - .5rem);
	}

	.ft2 ul {
		text-align: left;
		padding-left: 0;
	}

	.ft2 li {
		list-style-type: none;
		padding: 4px 0;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.footer a, .footer a:hover, .footer a:focus, .footer a:active{
		color: #fff;
		text-decoration: none;
	}

	@media (max-width: 1199px) {
		.ft2 button {
			margin-top: .5rem !important;
		}

		.ft2 ul {
			text-align: center;
			padding-left: 0 !important;
		}

		.ft2 li {
			padding: 4px 0;
		}

		.ft2 {
			padding: 1rem 0;
		}

		.ft1 {
			flex-direction: column;
			height: auto;
			text-align: center;
			line-height: initial;
			padding-bottom: 10px;
		}

		.ft1 div {
			margin-top: .5rem;
		}

		.ft1 div:nth-child(2) {
			margin-top: 20px;
		}

		.imgmain {
			display: none;
		}
		.small-title{
			margin-top: 10px;
		}
		
	}
</style> <?php }
}
