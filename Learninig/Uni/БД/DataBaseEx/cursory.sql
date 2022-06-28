

-- явный курсор, возвращающий названия  всех групп товаров, поступивших в текущем месяце
DECLARE
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


-- явный курсор с входными параметрами месяц и название группы товаров, возвращающий список всех товаров заданной группы, поступивших в заданном месяце текущего года
--ОБЪЯВЛЯЕМ
DECLARE
NOT_VALID_MONTH EXCEPTION;
NO_DATA EXCEPTION;

CURSOR currMYGroups(groupName VARCHAR2, mon VARCHAR2) IS -- КУРСОР С ПАРАМЕТРАМИ, ПИШИТЕ МЕСЯЦ ФОРМАТА 'MM'
	select P.NAME
	from PRODUCTS P, INCOMING INC, GROUPS G
	where G.GROUP_ID = P.GROUP_ID and
		G.NAME = groupName and
		P.PROD_ID = INC.PROD_ID and
		to_char(INC.INC_DATE, 'mm-yy') = to_char(mon) || '-' || to_char(sysdate, 'yy');
g currMYGroups%ROWTYPE;

groupNameCheck VARCHAR2(50);
monthCheck VARCHAR2(2);

BEGIN
groupNameCheck := 'Bakery products';
monthCheck := '02';

IF (monthCheck < 1 or monthCheck > 12) then
	RAISE NOT_VALID_MONTH;  --Молниеносная проверочка на месяц
END IF;

OPEN currMYGroups(groupNameCheck, monthCheck); --ОТКРЫЛИ, впихнули параметры

FETCH currMYGroups INTO g; --считали запись однократно

IF (currMYGroups%NOTFOUND) then -- Проверка через %NOTFOUND не случай если ничего нету
	RAISE NO_DATA;
END IF;
dbms_output.put_line('ТОВАР');
WHILE currMYGroups%FOUND LOOP
	dbms_output.put_line(to_char(currMYGroups%ROWCOUNT)|| ' ' ||g.NAME);
	FETCH currMYGroups INTO g; -- считываем в цикле
END LOOP;
EXCEPTION
	WHEN NOT_VALID_MONTH THEN
		dbms_output.put_line('Неправильно введён месяц');
	WHEN NO_DATA THEN
		dbms_output.put_line('Нет данных');
END;
