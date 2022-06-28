--Выполняется операторный триггер BEFORE (при его наличии)
--Для каждой строки, на которую воздействует оператор:
--Выполняется строковый триггер BEFORE (при его наличии).
--Выполняется собственно оператор.
--Выполняется строковый триггер AFTER (при его наличии).
--Выполняется операторный триггер AFTER (при его наличии).




-- Замещающие работают только над представлениями
-- а еше все замещающие триггеры строковые

-- 1) Создать представление, содержащее id продажи, id товара, имя товара, цену в рублях на дату продажи,
-- количество , имя менеджера, дату продажи.
CREATE OR REPLACE VIEW TRIG_VIEW AS
SELECT OUTG.OUT_ID, OUTG.PROD_ID, PROD.NAME AS PROD_NAME, P.VALUE * C.VALUE * OUTG.QUANTITY AS PRICE, OUTG.QUANTITY, M.NAME AS MAN_NAME, OUTG.OUT_DAY -- ТУТ МЫ ЦЕНУ УМНОЖАЕМ НА КУРС И НА КОЛИЧЕСТВО

FROM OUTGOING OUTG, PRODUCTS PROD, PRICES P, COURCES C, MANAGERS M

WHERE OUTG.PROD_ID = PROD.PROD_ID AND
    PROD.PROD_ID = P.PROD_ID AND
    P.CUR_ID = C.CUR_IDFROM AND
    C.CUR_IDTO = 4000000000 AND -- В РУБЛИ
    
    OUTG.OUT_DAY >= P.DAYFROM AND -- ПРИ УСЛОВИИ, ЧТО ПРОДАЛИ В ТОТ НУЖНЫЙ ОТРЕЗОК ЦЕНЫ
    (OUTG.OUT_DAY < P.DATETO OR P.DATETO IS NULL) AND
    
    OUTG.MAN_ID = M.MAN_ID AND -- НУ ОЧЕВИДНО МЕНЕДЖЕР
    
    C.DAYFROM <= OUTG.OUT_DAY AND -- КУРС НА МОМЕНТ ПРОДАЖИ
    (C.DAYTO >= OUTG.OUT_DAY OR C.DAYTO IS NULL);

-- 2) Создать замещающий триггер, который будет разрешать продавать только те товары, которые есть в наличии.
CREATE OR REPLACE TRIGGER PRODS_OUT

INSTEAD OF INSERT ON TRIG_VIEW 
FOR EACH ROW -- триггер строковый почему же? мы каждую вставку применяем! хотя можно и простой триггер


DECLARE
    pr_name PRODUCTS.NAME%TYPE;
    pr_id PRODUCTS.PROD_ID%TYPE;
    pr_check NUMBER;
    amount NUMBER;
    m_id MANAGERS.MAN_ID%TYPE;
    m_count NUMBER;
    o_id NUMBER;
    o_check NUMBER;
    tax OUTGOING.TAX_ID%TYPE;
    pr_group PRODUCTS.GROUP_ID%TYPE;
    calc_price NUMBER;
    
    
    not_enough EXCEPTION;
    invalid_man EXCEPTION;
    invalid_prod EXCEPTION;
    not_product EXCEPTION;
    invalid_out_id EXCEPTION;
    invalid_quantity EXCEPTION;

BEGIN     
    DBMS_OUTPUT.PUT_LINE(:NEW.PROD_ID);
    DBMS_OUTPUT.PUT_LINE(:NEW.PROD_NAME);

    IF (:NEW.OUT_ID < 8999999999 OR :NEW.OUT_ID > 9999999999) THEN
        RAISE invalid_out_id;
    END IF; --валидность id

    IF (:NEW.QUANTITY < 0) THEN
        RAISE invalid_quantity;
    END IF; --валидность количества

    IF (:NEW.PROD_ID IS NULL AND :NEW.PROD_NAME IS NULL) THEN
        RAISE not_product;
    END IF; -- если не вписал id и имя продукта

    if (:NEW.PROD_ID is NULL) THEN
        RAISE not_product;
    ELSE
        pr_id := :NEW.PROD_ID;
    end if;

    SELECT COUNT(PROD_ID) INTO pr_check FROM PRODUCTS 
    WHERE PROD_ID = pr_id; --проверяем валидность айдишки продукта

    IF (pr_check < 1) THEN 
        RAISE invalid_prod;
    END IF;
    

    SELECT COUNT(*), MAN_ID INTO m_count, m_id FROM MANAGERS
    WHERE LOWER(NAME) = LOWER(:NEW.MAN_NAME)
    GROUP BY MAN_ID; --ПРОВЕРЯЕМ ВАЛИДНЫХ МЕНЕДЖЕРОВ
    

    IF (m_count < 1) THEN 
        RAISE invalid_man;      
    END IF;
    
    


    SELECT SUM(INC.QUANTITY) - SUM(OUTG.QUANTITY) INTO amount -- ПРОИЗВОДИМ ПРОВЕРКУ. В ПЕРЕМЕННУЮ AMOUNT МЫ ВСТАВЛЯЕМ РАЗНОСТЬ ВХОДЯЩЕГО И ИСХОДЯЩЕГО КОЛИЧЕСТВА ТОВАРА, ТАКИМ ОБРАЗОМ
    FROM INCOMING INC, OUTGOING OUTG
    WHERE INC.PROD_ID = :NEW.PROD_ID and
        OUTG.PROD_ID = :NEW.PROD_ID and
        INC.INC_DATE <= :NEW.OUT_DAY and
        OUTG.OUT_DAY <= :NEW.OUT_DAY; 

    IF (amount < :NEW.QUANTITY) THEN
        RAISE not_enough; -- МЫ НАХОДИМ, ХВАТАЕТ ЛИ НАМ ТОВАРА И ЕСТЬ ЛИ ОН В НАЛИЧИИ, ИНАЧЕ БАЗА ВЫДАЕТ ОШИБКУ
    END IF;

    SELECT GROUP_ID INTO pr_group FROM PRODUCTS -- НОЛОГИ
    WHERE PROD_ID = pr_id;

    CASE (pr_group)
        WHEN 3000000000 THEN tax := 2000000000;
        WHEN 3000000001 THEN tax := 2000000000;
        WHEN 3000000002 THEN tax := 2000000001;
        WHEN 3000000003 THEN tax := 2000000001;
    END CASE;  



    -- Генерируем OUT_ID ЕСЛИ НЕПРАВИЛЬНО ВВЕЛИ
    SELECT COUNT(OUT_ID) INTO o_check FROM OUTGOING
    WHERE OUT_ID = :NEW.OUT_ID;

    IF (o_check > 0 OR :NEW.OUT_ID IS NULL) THEN
        SELECT MAX(OUT_ID) + 1 INTO o_id FROM OUTGOING;
    ELSE
        o_id := :NEW.OUT_ID;
    END IF;


    INSERT INTO OUTGOING(OUT_ID, PROD_ID, MAN_ID, OUT_DAY, QUANTITY, TAX_ID) --ВСТАВЛЯЕМ ВСЕ В OUTGOING ЕСЛИ НЕ ВЫСКАЧИЛО ИСКЛЮЧЕНИЙ
    VALUES(o_id, pr_id, m_id, :NEW.OUT_DAY, :NEW.QUANTITY, tax);
    
    DBMS_OUTPUT.PUT_LINE('Sold');

    EXCEPTION
        WHEN invalid_prod THEN
            RAISE_APPLICATION_ERROR(-20001, 'Invalid prod id');
        WHEN invalid_man THEN 
            RAISE_APPLICATION_ERROR(-20002, 'Manager does not exists');
        WHEN not_enough THEN 
            RAISE_APPLICATION_ERROR(-20003, 'Not enough!');
        WHEN not_product THEN
            RAISE_APPLICATION_ERROR(-20004, 'Not product');
        WHEN invalid_out_id THEN
            RAISE_APPLICATION_ERROR(-20005, 'Invalid outgoing id');
        WHEN invalid_quantity THEN
            RAISE_APPLICATION_ERROR(-20007, 'Invalid quantity');

END;

-- Test
BEGIN
    INSERT INTO TRIG_VIEW(OUT_ID, PROD_ID, MAN_NAME, QUANTITY, OUT_DAY) VALUES (9000000007, 1100000000, 'John', 999, SYSDATE);
END;
-- 3) Создать замещающий триггер, который будет разрешать удалять записи о продажах товаров,
-- проданных более, чем 2 года назад от текущей даты.


-- Удалить просто так из представления нельзя, зато можно сделать триггер
CREATE OR REPLACE TRIGGER DEL_OLD_OUT
INSTEAD OF DELETE ON TRIG_VIEW -- замещающий
FOR EACH ROW -- триггер строковый (активируется один раз для каждой из строк, на которые воздействует оператор) применяется на каждую строку, которую мы хотим удалить (в составе выражения)
DECLARE
    too_early EXCEPTION; --обозначаем ошибочку
BEGIN
    IF (MONTHS_BETWEEN(SYSDATE, :OLD.OUT_DAY) >= 24) THEN --совершаем проверочку
        DELETE FROM OUTGOING OUTG
        WHERE OUTG.OUT_ID = :OLD.OUT_ID; -- вот наши старые значения new у нас нет, это же delete
        DBMS_OUTPUT.PUT_LINE('Row was deleted');
    ELSE
        RAISE too_early; -- проверочка не вышла
    END IF;
    EXCEPTION
        WHEN too_early THEN
            DBMS_OUTPUT.PUT_LINE('Too early to delete this record!');
end;
-- Test
BEGIN
    INSERT INTO TRIG_VIEW(OUT_ID, PROD_ID, MAN_NAME, QUANTITY, OUT_DAY) VALUES (9000000007, 1100000000, 'John', 999, '01.01.2000');
END;

BEGIN
    DELETE FROM TRIG_VIEW WHERE OUT_ID = 9000000010;
END;
