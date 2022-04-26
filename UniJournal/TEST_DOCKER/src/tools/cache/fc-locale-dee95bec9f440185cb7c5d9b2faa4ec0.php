<?php return array (
  'emails.manualPaymentNotification.subject' => 'Уведомление о платеже',
  'emails.manualPaymentNotification.body' => 'Необходимо вручную обработать платеж для журнала «{$contextName}» и пользователя {$userFullName} (имя пользователя «{$userName}»).<br />
<br />
Оплата вносится за «{$itemName}».<br />
Сумма {$itemCost} ({$itemCurrencyCode}).<br />
<br />
Это письмо сгенерировано модулем «Ввод оплаты вручную» системы Open Journal Systems.',
  'emails.manualPaymentNotification.description' => 'Этот шаблон письма используется для уведомления управляющего журналом о том, что был запрошен ввод оплаты вручную.',
);