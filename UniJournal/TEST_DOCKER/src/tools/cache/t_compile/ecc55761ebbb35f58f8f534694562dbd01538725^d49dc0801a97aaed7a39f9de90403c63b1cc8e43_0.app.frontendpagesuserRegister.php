<?php
/* Smarty version 3.1.34-dev-7, created on 2021-09-25 02:58:58
  from 'app:frontendpagesuserRegister' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_614e90728b4ff5_02816348',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd49dc0801a97aaed7a39f9de90403c63b1cc8e43' => 
    array (
      0 => 'app:frontendpagesuserRegister',
      1 => 1611740175,
      2 => 'app',
    ),
  ),
  'includes' => 
  array (
    'app:frontend/components/header.tpl' => 1,
    'app:frontend/components/breadcrumbs.tpl' => 1,
    'app:common/formErrors.tpl' => 1,
    'app:frontend/components/registrationForm.tpl' => 1,
    'app:frontend/components/registrationFormContexts.tpl' => 1,
    'app:frontend/components/footer.tpl' => 1,
  ),
),false)) {
function content_614e90728b4ff5_02816348 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("app:frontend/components/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('pageTitle'=>"user.register"), 0, false);
?>

<div class="page page_register">
	<?php $_smarty_tpl->_subTemplateRender("app:frontend/components/breadcrumbs.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('currentTitleKey'=>"user.register"), 0, false);
?>
	<h1>
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register"),$_smarty_tpl ) );?>

	</h1>

	<form class="cmp_form register" id="register" method="post" action="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('op'=>"register"),$_smarty_tpl ) );?>
">
		<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['csrf'][0], array( array(),$_smarty_tpl ) );?>


		<?php if ($_smarty_tpl->tpl_vars['source']->value) {?>
			<input type="hidden" name="source" value="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['source']->value ));?>
" />
		<?php }?>

		<?php $_smarty_tpl->_subTemplateRender("app:common/formErrors.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

		<?php $_smarty_tpl->_subTemplateRender("app:frontend/components/registrationForm.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

				<?php if ($_smarty_tpl->tpl_vars['currentContext']->value) {?>

			<fieldset class="consent">
				<?php if ($_smarty_tpl->tpl_vars['currentContext']->value->getData('privacyStatement')) {?>
										<div class="fields">
						<div class="optin optin-privacy">
							<label>
								<input type="checkbox" name="privacyConsent" value="1"<?php if ($_smarty_tpl->tpl_vars['privacyConsent']->value) {?> checked="checked"<?php }?>>
								<?php $_smarty_tpl->smarty->ext->_capture->open($_smarty_tpl, 'default', "privacyUrl", null);
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('router'=>@constant('ROUTE_PAGE'),'page'=>"about",'op'=>"privacy"),$_smarty_tpl ) );
$_smarty_tpl->smarty->ext->_capture->close($_smarty_tpl);?>
								<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register.form.privacyConsent",'privacyUrl'=>$_smarty_tpl->tpl_vars['privacyUrl']->value),$_smarty_tpl ) );?>

							</label>
						</div>
					</div>
				<?php }?>
								<div class="fields">
					<div class="optin optin-email">
						<label>
							<input type="checkbox" name="emailConsent" value="1"<?php if ($_smarty_tpl->tpl_vars['emailConsent']->value) {?> checked="checked"<?php }?>>
							<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register.form.emailConsent"),$_smarty_tpl ) );?>

						</label>
					</div>
				</div>
			</fieldset>

						<?php $_smarty_tpl->_assignInScope('contextId', $_smarty_tpl->tpl_vars['currentContext']->value->getId());?>
			<?php $_smarty_tpl->_assignInScope('userCanRegisterReviewer', 0);?>
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['reviewerUserGroups']->value[$_smarty_tpl->tpl_vars['contextId']->value], 'userGroup');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['userGroup']->value) {
?>
				<?php if ($_smarty_tpl->tpl_vars['userGroup']->value->getPermitSelfRegistration()) {?>
					<?php $_smarty_tpl->_assignInScope('userCanRegisterReviewer', $_smarty_tpl->tpl_vars['userCanRegisterReviewer']->value+1);?>
				<?php }?>
			<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
			<?php if ($_smarty_tpl->tpl_vars['userCanRegisterReviewer']->value) {?>
				<fieldset class="reviewer">
					<?php if ($_smarty_tpl->tpl_vars['userCanRegisterReviewer']->value > 1) {?>
						<legend>
							<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.reviewerPrompt"),$_smarty_tpl ) );?>

						</legend>
						<?php $_smarty_tpl->smarty->ext->_capture->open($_smarty_tpl, 'default', "checkboxLocaleKey", null);?>user.reviewerPrompt.userGroup<?php $_smarty_tpl->smarty->ext->_capture->close($_smarty_tpl);?>
					<?php } else { ?>
						<?php $_smarty_tpl->smarty->ext->_capture->open($_smarty_tpl, 'default', "checkboxLocaleKey", null);?>user.reviewerPrompt.optin<?php $_smarty_tpl->smarty->ext->_capture->close($_smarty_tpl);?>
					<?php }?>
					<div class="fields">
						<div id="reviewerOptinGroup" class="optin">
							<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['reviewerUserGroups']->value[$_smarty_tpl->tpl_vars['contextId']->value], 'userGroup');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['userGroup']->value) {
?>
								<?php if ($_smarty_tpl->tpl_vars['userGroup']->value->getPermitSelfRegistration()) {?>
									<label>
										<?php $_smarty_tpl->_assignInScope('userGroupId', $_smarty_tpl->tpl_vars['userGroup']->value->getId());?>
										<input type="checkbox" name="reviewerGroup[<?php echo $_smarty_tpl->tpl_vars['userGroupId']->value;?>
]" value="1"<?php if (in_array($_smarty_tpl->tpl_vars['userGroupId']->value,$_smarty_tpl->tpl_vars['userGroupIds']->value)) {?> checked="checked"<?php }?>>
										<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>$_smarty_tpl->tpl_vars['checkboxLocaleKey']->value,'userGroup'=>$_smarty_tpl->tpl_vars['userGroup']->value->getLocalizedName()),$_smarty_tpl ) );?>

									</label>
								<?php }?>
							<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						</div>

						<div id="reviewerInterests" class="reviewer_interests">
														<div class="label">
								<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.interests"),$_smarty_tpl ) );?>

							</div>
							<ul class="interests tag-it" data-field-name="interests[]" data-autocomplete-url="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('router'=>@constant('ROUTE_PAGE'),'page'=>'user','op'=>'getInterests'),$_smarty_tpl ) ) ));?>
">
								<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['interests']->value, 'interest');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['interest']->value) {
?>
									<li><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['interest']->value ));?>
</li>
								<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
							</ul>
						</div>
					</div>
				</fieldset>
			<?php }?>
		<?php }?>

		<?php $_smarty_tpl->_subTemplateRender("app:frontend/components/registrationFormContexts.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

				<?php if (!$_smarty_tpl->tpl_vars['currentContext']->value) {?>
			<fieldset class="reviewer_nocontext_interests">
				<legend>
					<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register.noContextReviewerInterests"),$_smarty_tpl ) );?>

				</legend>
				<div class="fields">
					<div class="reviewer_nocontext_interests">
												<ul class="interests tag-it" data-field-name="interests[]" data-autocomplete-url="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('router'=>@constant('ROUTE_PAGE'),'page'=>'user','op'=>'getInterests'),$_smarty_tpl ) ) ));?>
">
							<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['interests']->value, 'interest');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['interest']->value) {
?>
								<li><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['interest']->value ));?>
</li>
							<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						</ul>
					</div>
				</div>
			</fieldset>

						<?php if ($_smarty_tpl->tpl_vars['siteWidePrivacyStatement']->value) {?>
				<div class="fields">
					<div class="optin optin-privacy">
						<label>
							<input type="checkbox" name="privacyConsent[<?php echo @constant('CONTEXT_ID_NONE');?>
]" id="privacyConsent[<?php echo @constant('CONTEXT_ID_NONE');?>
]" value="1"<?php if ($_smarty_tpl->tpl_vars['privacyConsent']->value[@constant('CONTEXT_ID_NONE')]) {?> checked="checked"<?php }?>>
							<?php $_smarty_tpl->smarty->ext->_capture->open($_smarty_tpl, 'default', "privacyUrl", null);
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('router'=>@constant('ROUTE_PAGE'),'page'=>"about",'op'=>"privacy"),$_smarty_tpl ) );
$_smarty_tpl->smarty->ext->_capture->close($_smarty_tpl);?>
							<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register.form.privacyConsent",'privacyUrl'=>$_smarty_tpl->tpl_vars['privacyUrl']->value),$_smarty_tpl ) );?>

						</label>
					</div>
				</div>
			<?php }?>

						<div class="fields">
				<div class="optin optin-email">
					<label>
						<input type="checkbox" name="emailConsent" value="1"<?php if ($_smarty_tpl->tpl_vars['emailConsent']->value) {?> checked="checked"<?php }?>>
						<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register.form.emailConsent"),$_smarty_tpl ) );?>

					</label>
				</div>
			</div>
		<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['reCaptchaHtml']->value) {?>
			<fieldset class="recaptcha_wrapper">
				<div class="fields">
					<div class="recaptcha">
						<?php echo $_smarty_tpl->tpl_vars['reCaptchaHtml']->value;?>

					</div>
				</div>
			</fieldset>
		<?php }?>

		<div class="buttons">
			<button class="submit" type="submit">
				<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.register"),$_smarty_tpl ) );?>

			</button>

			<?php $_smarty_tpl->smarty->ext->_capture->open($_smarty_tpl, 'default', "rolesProfileUrl", null);
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('page'=>"user",'op'=>"profile",'path'=>"roles"),$_smarty_tpl ) );
$_smarty_tpl->smarty->ext->_capture->close($_smarty_tpl);?>
			<a href="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('page'=>"login",'source'=>$_smarty_tpl->tpl_vars['rolesProfileUrl']->value),$_smarty_tpl ) );?>
" class="login"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['translate'][0], array( array('key'=>"user.login"),$_smarty_tpl ) );?>
</a>
		</div>
	</form>

</div><!-- .page -->

<?php $_smarty_tpl->_subTemplateRender("app:frontend/components/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}
