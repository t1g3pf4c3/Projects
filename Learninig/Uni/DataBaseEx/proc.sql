--  Процедура с входными параметрами месяц и название группы товаров, возвращающий список
-- всех товаров заданной группы, поступивших в заданном месяце текущего года
CREATE OR REPLACE PROCEDURE procShowProd(procGroupID NUMBER, procMon VARCHAR2) --не имя группы для отработки ошибок
AS
NOT_VALID_MONTH EXCEPTION;
FAKE_DATE EXCEPTION;
NOT_VALID_PRODUCT EXCEPTION;
NO_DATA EXCEPTION;
CURSOR currMYGroups(groupID NUMBER, mon VARCHAR2) IS
	select P.NAME
	from PRODUCTS P, INCOMING INC
	where groupID = P.GROUP_ID and
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


BEGIN
    procShowProd(3000000001, '02'); --варчар из-за формата месяца. муторно и тяжко
END;
