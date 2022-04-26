<?php return array (
  'installer.additionalLocales' => 'Дополнительные языки',
  'installer.administratorAccount' => 'Учетная запись администратора',
  'installer.administratorAccountInstructions' => 'Этот пользователь станет администратором сайта и получит полный доступ к системе. Дополнительные учетные записи пользователей можно будет создать после завершения установки.',
  'installer.checkNo' => '<span class="pkp_form_error formError">НЕТ</span>',
  'installer.checkYes' => 'Да',
  'installer.clientCharset' => 'Кодировка клиента',
  'installer.clientCharsetInstructions' => 'Кодировка, которая используется для обмена данными с браузерами.',
  'installer.configFileError' => 'Конфигурационный файл <tt>config.inc.php</tt> не существует или не доступен для чтения.',
  'installer.connectionCharset' => 'Кодировка для соединения с БД',
  'installer.contentsOfConfigFile' => 'Содержимое конфигурационного файла',
  'installer.createDatabase' => 'Создать новую базу данных',
  'installer.createDatabaseInstructions' => 'Для использования этого параметра необходимо, чтобы ваша СУБД поддерживала возможность удаленного создания базы данных, а ваша учетная запись пользователя БД имела соответствующие права на создание новых баз данных. Если установка завершается неудачей при использовании этого параметра, создайте базу данных на сервере вручную и запустите установку снова, отключив этот параметр.',
  'installer.databaseDriver' => 'Драйвер базы данных',
  'installer.databaseDriverInstructions' => '<strong>Для драйверов, приведенных в квадратных скобках, похоже не загруженны необходимые расширения PHP, и, в случае выбора одного из них, установка скорее всего закончится неудачно.</strong><br />Любые неподдерживаемые драйверы базы данных, указанные в приведенном выше списке, находятся там исключительно с информационными целями и скорее всего не будут работать.',
  'installer.databaseHost' => 'Хост',
  'installer.databaseHostInstructions' => 'Оставьте имя хоста пустым для соединения при помощи UNIX domain sockets вместо TCP/IP. Эта настройка не обязательна для MySQL, который будет автоматически использовать sockets, если введено «localhost», но может потребоваться для других СУБД, таких как PostgreSQL.',
  'installer.databaseName' => 'Имя базы данных',
  'installer.databasePassword' => 'Пароль',
  'installer.databaseSettings' => 'Настройки базы данных',
  'installer.databaseUsername' => 'Имя пользователя',
  'installer.filesDir' => 'Каталог для загружаемых на сервер файлов',
  'installer.fileSettings' => 'Настройки файлов',
  'installer.form.clientCharsetRequired' => 'Кодировка клиента должна быть выбрана.',
  'installer.form.databaseDriverRequired' => 'Драйвер СУБД должен быть выбран.',
  'installer.form.databaseNameRequired' => 'Имя базы данных обязательно.',
  'installer.form.emailRequired' => 'Правильный адрес электронной почты для учетной записи администратора обязателен.',
  'installer.form.filesDirRequired' => 'Каталог для хранения загруженных на сервер файлов обязателен.',
  'installer.form.localeRequired' => 'Язык должен быть выбран.',
  'installer.form.passwordRequired' => 'Пароль для учетной записи администратора обязателен.',
  'installer.form.passwordsDoNotMatch' => 'Пароли администратора не соответствуют друг другу.',
  'installer.form.separateMultiple' => 'Несколько вводимых значений разделяйте запятыми',
  'installer.form.usernameAlphaNumeric' => 'Имя пользователя для учетной записи администратора может содержать только буквы, цифры, подчеркивания и дефисы; оно должно начинаться и заканчиваться буквой или цифрой.',
  'installer.form.usernameRequired' => 'Имя пользователя для учетной записи администратора обязательно.',
  'installer.installationWrongPhp' => '<br/><strong>ПРЕДУПРЕЖДЕНИЕ: Ваша текущая версия PHP не соответствует минимальным требованиям для установки. Рекомендуется обновить PHP до более новой версии.</strong>',
  'installer.installErrorsOccurred' => 'Во время установки произошли ошибки',
  'installer.installerSQLStatements' => 'SQL-запросы для установки',
  'installer.installFileError' => 'Файл установки <tt>dbscripts/xml/install.xml</tt> не существует или не доступен для чтения.',
  'installer.installFilesDirError' => 'Каталог, указанный в качестве каталога для хранения загруженных на сервер файлов, не существует или не доступен для записи.',
  'installer.installParseDBFileError' => 'Ошибка синтаксического разбора файла установки БД <tt>{$file}</tt>.',
  'installer.installParseEmailTemplatesFileError' => 'Ошибка синтаксического разбора файла шаблонов писем электронной почты <tt>{$file}</tt>.',
  'installer.installParseFilterConfigFileError' => 'Ошибка синтаксического разбора файла конфигурации фильтров <tt>{$file}</tt>.',
  'installer.unsupportedUpgradeError' => 'Обновление не поддерживается. Смотрите подробнее в docs/UPGRADE-UNSUPPORTED.',
  'installer.locale' => 'Язык',
  'installer.locale.maybeIncomplete' => 'Поддержка отмеченных языков может быть неполной.',
  'installer.localeSettings' => 'Настройки языка',
  'installer.oaiSettings' => 'Настройки OAI',
  'installer.oaiRepositoryIdInstructions' => 'Уникальный идентификатор используется для идентификации записей метаданных, проиндексированных с этого сайта, при использовании протокола сбора метаданных <a href="https://www.openarchives.org/" target="_blank">Open Archives Initiative</a>.',
  'installer.oaiRepositoryId' => 'Идентификатор хранилища',
  'installer.publicFilesDirError' => 'Каталог public для файлов не существует или не доступен для записи.',
  'installer.releaseNotes' => 'Примечания к выпуску',
  'installer.preInstallationInstructionsTitle' => 'Шаги подготовки к установке',
  'installer.preInstallationInstructions' => '
		<p>1. Следующие файлы и каталоги (и их содержимое) должно быть сделано доступным для записи:</p>
		<ul>
			<li><tt>config.inc.php</tt> доступен для записи (не обязательно): {$writable_config}</li>
			<li><tt>public/</tt> доступен для записи: {$writable_public}</li>
			<li><tt>cache/</tt> доступен для записи: {$writable_cache}</li>
			<li><tt>cache/t_cache/</tt> доступен для записи: {$writable_templates_cache}</li>
			<li><tt>cache/t_compile/</tt> доступен для записи: {$writable_templates_compile}</li>
			<li><tt>cache/_db</tt> доступен для записи: {$writable_db_cache}</li>
		</ul>

		<p>2. Каталог для хранения загруженных на сервер файлов должен быть создан и сделан доступным для записи(смотри «Настройки файлов» ниже).</p>
	',
  'installer.configureXSLMessage' => '<p>В вашей инсталляции PHP не включен модуль XSL. Включите его или настройте параметр xslt_command в вашем файле config.inc.php.</p>',
  'installer.beacon' => 'Маяк',
  'installer.beacon.enable' => 'Задать уникальный ID сайта и базовый URL OAI для PKP, которые будут использоваться только для сбора статистики и предупреждений о безопасности.',
  'installer.unsupportedPhpError' => 'Версия PHP, установленная на вашем сервере, не поддерживается данным программным обеспечением. Сверьтесь еще раз с требованиями к установке в docs/README.',
);