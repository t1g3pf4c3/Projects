--8 ВАРИАНТ Неявные курсоры
--1) неявный курсор, возвращающий количество различных групп товаров, поступивших в текущем месяце
-- Тут всё просто и очевидно
DECLARE
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

-- Хотелось бы отметить, что тут курсорные аттрибуты не используются

--2) неявный курсор  удаляющий  для указанной группы товаров  поступления  заданного месяца текущего года. Сообщить, 
--если в указанном месяце не было поступлений вообще или не было поступлений указанной группы товаров

DECLARE
    NOT_VALID_MONTH EXCEPTION;          -- Объявление ошибок
    NO_INCS_IN_THIS_MON EXCEPTION;
    NO_GROUP_INCS_IN_THIS_MON EXCEPTION;
    mon NUMBER;                        -- Объявление переменных
    g_id NUMBER;
    incs_in_month NUMBER;
    group_incs_in_month NUMBER;
BEGIN
    mon := 9;                          -- Месяц
    g_id := 3000000001;                -- Группа
    IF (mon < 1 OR mon > 12) THEN      -- Проверка месяца на валидность, чтобы не было бреда
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
