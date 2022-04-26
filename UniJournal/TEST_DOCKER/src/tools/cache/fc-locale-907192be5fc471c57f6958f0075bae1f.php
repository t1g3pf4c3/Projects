<?php return array (
  'emails.orcidCollectAuthorId.subject' => 'ORCID материала',
  'emails.orcidCollectAuthorId.body' => '{$authorName}!<br/>
<br/>
Вы были указаны как автор материала, отправленного в «{$contextName}».<br/>
Чтобы подтвердить свое авторство, пожалуйста, добавьте свой идентификатор ORCID к этому материалу, перейдя по приведенной ниже ссылке.<br/>
<br/>
<a href="{$authorOrcidUrl}"><img id="orcid-id-logo" src="https://orcid.org/sites/default/files/images/orcid_16x16.png" width=\'16\' height=\'16\' alt="ORCID iD icon" style="display: block; margin: 0 .5em 0 0; padding: 0; float: left;"/>Создать или подключить ваш ORCID iD</a><br/>
<br/>
<br>
<a href="{$orcidAboutUrl}">Дополнительная информация об ORCID в «{$contextName}»</a><br/>
<br/>
Если у Вас есть какие-либо вопросы, пожалуйста, свяжитесь со мной.<br/>
<br/>
{$principalContactSignature}<br/>
',
  'emails.orcidCollectAuthorId.description' => 'Этот шаблон письма используется для сбора идентификаторов ORCID с авторов.',
  'emails.orcidRequestAuthorAuthorization.subject' => 'Запрос доступа к записи ORCID',
  'emails.orcidRequestAuthorAuthorization.body' => '{$authorName}!<br>
<br>
Вы были указаны как автор материала «{$submissionTitle}», отправленного в «{$contextName}».
<br>
<br>
Пожалуйста, дайте нам возможность добавить ваш ORCID id к этому материалу, а также добавить материал в ваш профиль ORCID после публикации.<br>
Перейдите по ссылке на официальном вебсайте ORCID, войдите в систему с вашей учетной записью и авторизуйте доступ, следуя инструкциям.<br>
<a href="{$authorOrcidUrl}"><img id="orcid-id-logo" src="https://orcid.org/sites/default/files/images/orcid_16x16.png" width=\'16\' height=\'16\' alt="ORCID iD icon" style="display: block; margin: 0 .5em 0 0; padding: 0; float: left;"/>Создать или подключить ваш ORCID iD</a><br/>
<br>
<br>
<a href="{$orcidAboutUrl}">Подробнее об ORCID в «{$contextName}»</a><br/>
<br>
Если у Вас есть какие-либо вопросы, пожалуйста, свяжитесь со мной.<br>
<br>
{$principalContactSignature}<br>
',
  'emails.orcidRequestAuthorAuthorization.description' => 'Этот шаблон письма используется для запроса доступа к записи ORCID у авторов.',
);