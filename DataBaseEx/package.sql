
CREATE OR REPLACE PACKAGE MAKIPACK AS -- СПЕЦИФИКАЦИЯ ПАКЕТА
PROCEDURE procShowProd(procGroupID NUMBER, procMon VARCHAR2);
PROCEDURE nameIncThisMonth;
PROCEDURE countIncThisMonth;
PROCEDURE procGetAccountCount(bankId NUMBER, contID NUMBER);
PROCEDURE delGroupMonth(groupID NUMBER, montht NUMBER);
FUNCTION getAccCount(bankId NUMBER, contID NUMBER) RETURN NUMBER;
FUNCTION get_bank_name(id NUMBER) RETURN BANKS.NAME%Type;
FUNCTION get_bank_id(b_name VARCHAR2) RETURN BANKS.BANK_ID%Type;
END MAKIPACK;

--ТЕЛО ПАКЕТА
CREATE OR REPLACE PACKAGE BODY MAKIPACK AS --AS IS разницы нет

PROCEDURE procShowProd(procGroupID NUMBER, procMon VARCHAR2) --не имя группы для отработки ошибок
AS
NOT_VALID_MONTH EXCEPTION;
FAKE_DATE EXCEPTION;
NOT_VALID_PRODUCT EXCEPTION;
NO_DATA EXCEPTION;
CURSOR currMYGroups(groupID NUMBER, mon VARCHAR2) IS
	select P.NAME
	from PRODUCTS P, INCOMING INC
	where 3000000001 = P.GROUP_ID and
		P.PROD_ID = INC.PROD_ID and
		to_char(INC.INC_DATE, 'mm-yy') = mon || '-' || to_char(sysdate, 'yy'); 
g currMYGroups%ROWTYPE;
BEGIN
IF (procMon < 1 or procMon > 12) then
	RAISE NOT_VALID_MONTH;
END IF;
IF (procMon > TO_CHAR(SYSDATE, 'MM')) then
	RAISE FAKE_DATE;
END IF;
IF (procGroupID < 3000000000 OR procGroupID > 4000000000) then
	RAISE NOT_VALID_PRODUCT;
END IF;
OPEN currMYGroups(procGroupID, procMon);
FETCH currMYGroups INTO g;
IF (currMYGroups%NOTFOUND) then
	RAISE NO_DATA;
END IF;
dbms_output.put_line('№ Good');
WHILE currMYGroups%FOUND LOOP
	dbms_output.put_line(to_char(currMYGroups%ROWCOUNT)|| ' ' ||g.NAME);
	FETCH currMYGroups INTO g;
END LOOP;
EXCEPTION
	WHEN NOT_VALID_MONTH THEN
		dbms_output.put_line('Not valid number of month');
	WHEN NOT_VALID_PRODUCT THEN
		dbms_output.put_line('Not valid product id');
	WHEN FAKE_DATE THEN
		dbms_output.put_line('Late date');
	WHEN NO_DATA THEN
		dbms_output.put_line('No data');
END;


PROCEDURE nameIncThisMonth
IS
NO_DATA EXCEPTION;
CURSOR currMGroups IS
	select distinct G.NAME
	from GROUPS G, PRODUCTS P, INCOMING INC
	where G.GROUP_ID = P.GROUP_ID and
		P.PROD_ID = INC.PROD_ID and
		to_char(INC.INC_DATE, 'mm-yyyy') = to_char(sysdate, 'mm-yyyy');
		g currMGroups%ROWTYPE; --ВРЕМЕННАЯ ПЕРЕМЕННАЯ ДЛЯ ХРАНЕНИЯ ТЕКУЩЕЙ СТРОКИ КУРСОРА
BEGIN

OPEN currMGroups; -- ОТКРЫВАЕМ

FETCH currMGroups INTO g; --ФЕТЧИМ
IF (currMGroups%NOTFOUND) then -- Если ничего нет
	RAISE NO_DATA;
END IF;

dbms_output.put_line('Группа');
WHILE currMGroups%FOUND LOOP -- Цикл while, курсорный аттрибут %found, пока что-то есть
	dbms_output.put_line(to_char(currMGroups%ROWCOUNT)|| ' ' ||g.NAME);
	FETCH currMGroups INTO g; --Фетчим в цикле
END LOOP;

EXCEPTION --Обработка исключений
	WHEN NO_DATA THEN
		dbms_output.put_line('Нет данных');
END;

PROCEDURE countIncThisMonth
AS
group_count number(10,0) := 0;
BEGIN
    SELECT COUNT(DISTINCT g.GROUP_ID) INTO group_count
    FROM GROUPS g, PRODUCTS p, INCOMING inc
    WHERE
        p.PROD_ID = inc.PROD_ID AND
        p.GROUP_ID = g.GROUP_ID AND
        TO_CHAR(inc.INC_DATE, 'mm-yy') = TO_CHAR(SYSDATE, 'mm-yy');
    dbms_output.put_line( group_count  || ' Групп товаров поступивших в текущем месяце');
END;



PROCEDURE delGroupMonth(groupID NUMBER, montht NUMBER)
AS
    NOT_VALID_MONTH EXCEPTION;          -- Объявление ошибок
    NO_INCS_IN_THIS_MON EXCEPTION;
    NO_GROUP_INCS_IN_THIS_MON EXCEPTION;
    mon NUMBER;                        -- Объявление переменных
    g_id NUMBER;
    incs_in_month NUMBER;
    group_incs_in_month NUMBER;
BEGIN
    mon := montht;                          -- Месяц
    g_id := groupID;                -- Группа
    IF (mon < 1 OR mon > 12) THEN      -- Проверка месяца на валидность, что�ы не было бреда
        RAISE NOT_VALID_MONTH;
    END IF;
                                       -- Проверка поступлений в этом месяце
    SELECT COUNT(INC_ID) INTO incs_in_month FROM INCOMING  
        WHERE TO_CHAR(INC_DATE, 'MM') = mon AND TO_CHAR(INC_DATE, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY');
    IF (incs_in_month = 0) THEN
        RAISE NO_INCS_IN_THIS_MON;     -- Если нет
    END IF;
                                       -- Проверка поступлений указанной группы
    SELECT COUNT(INC.INC_ID) INTO group_incs_in_month FROM INCOMING INC, PRODUCTS P
        WHERE TO_CHAR(INC.INC_DATE, 'MM') = mon
        AND TO_CHAR(INC.INC_DATE, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')
        AND P.PROD_ID = INC.PROD_ID
        AND P.GROUP_ID = g_id;
    IF (group_incs_in_month = 0) THEN  
        RAISE NO_GROUP_INCS_IN_THIS_MON;-- Если нет
    END IF;
                                        -- Не наткнулся на ошибки? Удоляй
    DELETE FROM INCOMING WHERE INC_ID IN (
        SELECT INC.INC_ID FROM INCOMING INC, PRODUCTS P
            WHERE TO_CHAR(INC.INC_DATE, 'MM') = mon
            AND TO_CHAR(INC.INC_DATE, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')
            AND P.PROD_ID = INC.PROD_ID
            AND P.GROUP_ID = g_id
    );
    dbms_output.put_line(group_incs_in_month || ' incs deleted');
    EXCEPTION                                                          --Обработка ошибок
        WHEN NOT_VALID_MONTH THEN
            dbms_output.put_line('Not valid number of month');
        WHEN NO_INCS_IN_THIS_MON THEN
            dbms_output.put_line('No incomings in this month');
        WHEN NO_GROUP_INCS_IN_THIS_MON THEN
            dbms_output.put_line('No group incomings in this month');
END;


FUNCTION get_bank_name(id NUMBER) --тут мы не ставим ограничений
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

--ОБРАТНАЯ
FUNCTION get_bank_id(b_name VARCHAR2)
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

FUNCTION getAccCount(bankId NUMBER, contID NUMBER)
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

PROCEDURE procGetAccountCount(bankId NUMBER, contID NUMBER)
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
END MAKIPACK;
--КОНЕЦ ТЕЛА

--ВЫЗЫВАЙ НЕ ХОЧУ
BEGIN
MAKIPACK.countIncThisMonth;
MAKIPACK.nameIncThisMonth;
END;
�
