-- 8 ВАРИАНТ Функции
-- Функция, возвращающая наименование банка по его идентификатору и обратную ей функцию;
CREATE OR REPLACE FUNCTION get_bank_name(id NUMBER) --тут мы не ставим ограничений
RETURN BANKS.NAME%Type --Возвращаем точно такой же тип, как имя банка
AS
bank_name BANKS.NAME%Type;
BEGIN
	BEGIN
		SELECT NAME INTO bank_name FROM BANKS WHERE BANK_ID = id; --Исполняем селект
	EXCEPTION --Исключений
		WHEN TOO_MANY_ROWS THEN RAISE_APPLICATION_ERROR(-20001, 'Банк не определен'); -- Более одного
		WHEN NO_DATA_FOUND THEN RAISE_APPLICATION_ERROR(-20002, 'Банк не найден'); --Ничего не найдено
	END;
	RETURN bank_name; --Делаем обязательный возврат
END;
SELECT get_bank_name(1000000001) FROM DUAL; --вызываем функцию в составе выражения, иначе нельзя, для этого есть DUAL 
--ОБРАТНАЯ
CREATE OR REPLACE FUNCTION get_bank_id(b_name VARCHAR2)
RETURN BANKS.BANK_ID%Type -- Возвращаем такой же тип
AS
bank_id BANKS.BANK_ID%Type;
BEGIN
	BEGIN
		SELECT BANK_ID INTO bank_id FROM BANKS WHERE NAME = b_name;
	EXCEPTION
		WHEN TOO_MANY_ROWS THEN RAISE_APPLICATION_ERROR(-20001, 'Банк не определен');
		WHEN NO_DATA_FOUND THEN RAISE_APPLICATION_ERROR(-20002, 'Банк не найден');
	END;
	RETURN bank_id;
END;
SELECT get_bank_id('SberBankich') FROM DUAL;

-- Функция, возвращающая количество действующих счетов в указанном банке для указанного контрагента;
CREATE OR REPLACE FUNCTION getAccCount(bankId NUMBER, contID NUMBER)
RETURN NUMBER
AS
NOT_VALID_BANK_ID EXCEPTION;
NOT_VALID_CONTRAGENT_ID EXCEPTION;
accCount NUMBER;
BEGIN
	IF (bankId > 2000000000 OR bankId < 999999999) then
		RAISE NOT_VALID_BANK_ID; --проверка на валидность банка
	END IF;
	IF (contID > 70000000000 OR contID < 5999999999) then
		RAISE NOT_VALID_CONTRAGENT_ID; --проверка на валидность контрагента
	END IF;
	BEGIN
		SELECT COUNT(ACC_ID) INTO accCount
		FROM ACCOUNTS
		WHERE BANK_ID = bankId AND
			CONTR_ID = contID AND
			(DAYTO IS NULL OR DAYTO >= SYSDATE);
	
    EXCEPTION
		WHEN TOO_MANY_ROWS THEN RAISE_APPLICATION_ERROR(-20001, 'Банк не определен');
		WHEN NO_DATA_FOUND THEN RAISE_APPLICATION_ERROR(-20002, 'Банк не найден');
	END;

	RETURN accCount;
    
    EXCEPTION
		WHEN NOT_VALID_BANK_ID THEN RAISE_APPLICATION_ERROR(-20003, 'Неверный идентификатор банка');
		WHEN NOT_VALID_CONTRAGENT_ID THEN RAISE_APPLICATION_ERROR(-20004, 'Неверный идентификатор контрагента');
END;
SELECT getAccCount(1000000000, 6000000000) FROM DUAL;

-- Используя пользовательские функции напишите процедуру распечатывающую количество действующих счетов в банке для контрагентов от которых были поступления в текущем месяце
CREATE OR REPLACE FUNCTION getAccCountProc(bankId NUMBER, contID NUMBER)
RETURN NUMBER
AS
accCount NUMBER;
BEGIN
	BEGIN
		SELECT COUNT(A.ACC_ID) INTO accCount
		
        FROM ACCOUNTS A, INCOMING INC
		
        WHERE BANK_ID = bankId AND
			A.CONTR_ID = contID AND
			INC.CONTR_ID = A.CONTR_ID AND
			(A.DAYTO IS NULL OR A.DAYTO >= SYSDATE) AND
			TO_CHAR(INC.INC_DATE, 'MM.YYYY') = TO_CHAR(SYSDATE, 'MM.YYYY');
		EXCEPTION
			WHEN TOO_MANY_ROWS THEN RAISE_APPLICATION_ERROR(-20001, 'Счета не определены');
			WHEN NO_DATA_FOUND THEN RAISE_APPLICATION_ERROR(-20001, 'Счет не найден');
	END;
	RETURN accCount;
END;

CREATE OR REPLACE PROCEDURE procGetAccountCount(bankId NUMBER, contID NUMBER)
AS
NOT_VALID_BANK_ID EXCEPTION;
NOT_VALID_CONTRAGENT_ID EXCEPTION;
accCount NUMBER;
BEGIN
	IF (bankId > 2000000000 OR bankId < 999999999) then
		RAISE NOT_VALID_BANK_ID; --проверка на валидность банка
	END IF;
	IF (contID > 70000000000 OR contID < 5999999999) then
		RAISE NOT_VALID_CONTRAGENT_ID; --проверка на валидность контрагента
	END IF;

	SELECT getAccCountProc(bankId, contID) INTO accCount FROM DUAL;
	
    dbms_output.put_line('Count: ' || TO_CHAR(accCount));
	
    EXCEPTION
		WHEN NOT_VALID_BANK_ID THEN
			dbms_output.put_line('Неверный идентификатор банка');
		WHEN NOT_VALID_CONTRAGENT_ID THEN
			dbms_output.put_line('Неверный идентификатор контрагента');
END;
/

BEGIN
    procGetAccountCount(1000000000, 6000000000);
END;
