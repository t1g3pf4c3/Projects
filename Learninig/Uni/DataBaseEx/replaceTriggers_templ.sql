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
INSTEAD OF INSERT ON V_OUT 
FOR EACH ROW
DECLARE
    pr_name PRODUCTS.PROD_NAME%TYPE;
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
    IF (:NEW.OUT_ID < 1000 OR :NEW.OUT_ID > 9999) THEN
        RAISE invalid_out_id;
    END IF;

    IF (:NEW.QUANTITY < 0) THEN
        RAISE invalid_quantity;
    END IF;

    IF (:NEW.PROD_ID IS NULL AND :NEW.PROD_NAME IS NULL) THEN
        RAISE not_product;
    END IF;

    IF (:NEW.PROD_ID IS NULL) THEN
        SELECT PROD_ID INTO pr_id FROM PRODUCTS
        WHERE LOWER(PROD_NAME) = LOWER(:NEW.PROD_NAME)
        FETCH FIRST 1 ROWS ONLY;
        pr_name:= LOWER(:NEW.PROD_NAME);
    ELSE
        pr_id := :NEW.PROD_ID;
        pr_name := LOWER(:NEW.PROD_NAME);
    END IF;

    SELECT COUNT(PROD_ID) INTO pr_check FROM PRODUCTS 
    WHERE PROD_ID = pr_id;

    IF (pr_check < 1) THEN 
        RAISE invalid_prod;
    END IF;

    SELECT COUNT(*), MAN_ID INTO m_count, m_id FROM MANAGERS
    WHERE LOWER(MAN_NAME) = LOWER(:NEW.MAN_NAME)
    GROUP BY MAN_ID;

    IF (m_count < 1) THEN 
        RAISE invalid_man;      
    END IF;

    SELECT SUM(INC.QUANTITY) - SUM(OUTG.QUANTITY) INTO amount
    FROM INCOMING INC, OUTGOING OUTG
    WHERE INC.PROD_ID = :NEW.PROD_ID and
        OUTG.PROD_ID = :NEW.PROD_ID and
        INC.INC_DATE <= :NEW.OUT_DATE and
        OUTG.OUT_DATE <= :NEW.OUT_DATE; 

    IF (amount < :NEW.QUANTITY) THEN
        RAISE not_enough;
    END IF;

    SELECT GROUP_ID INTO pr_group FROM PRODUCTS
    WHERE PROD_ID = pr_id;

    CASE (pr_group)
        WHEN 1000 THEN tax := 1002;
        WHEN 1001 THEN tax := 1000;
        WHEN 1002 THEN tax := 1001;
        WHEN 1003 THEN tax := 1001;
    END CASE;  

    SELECT COUNT(OUT_ID) INTO o_check FROM OUTGOING
    WHERE OUT_ID = :NEW.OUT_ID;

    IF (o_check > 0 OR :NEW.OUT_ID IS NULL) THEN
        SELECT MAX(OUT_ID) + 1 INTO o_id FROM OUTGOING;
    ELSE
        o_id := :NEW.OUT_ID;
    END IF;

    INSERT INTO OUTGOING(OUT_ID, PROD_ID, MAN_ID, OUT_DATE, QUANTITY, TAX_ID)
    VALUES(o_id, pr_id, m_id, :NEW.OUT_DATE, :NEW.QUANTITY, tax);

    DBMS_OUTPUT.PUT_LINE('Sold');

    EXCEPTION
        WHEN invalid_prod THEN
            RAISE_APPLICATION_ERROR(-20001, 'Invalid prod name');
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
    INSERT INTO V_OUT(OUT_ID, PROD_ID, MAN_NAME, QUANTITY, OUT_DATE) VALUES (1000, 1000, 'Kathryn Jacobus', 999, SYSDATE);
    INSERT INTO V_OUT(OUT_ID, PROD_ID, MAN_NAME, QUANTITY, OUT_DATE) VALUES (1000, 1000, 'Kathryn Jacobus', 1, SYSDATE);
END;

-- 3) Создать замещающий триггер, который будет разрешать удалять записи о продажах товаров,
-- проданных более, чем 2 года назад от текущей даты.

CREATE OR REPLACE TRIGGER DEL_OLD_OUT
INSTEAD OF DELETE ON V_OUT
FOR EACH ROW
DECLARE
    too_early EXCEPTION;
BEGIN
    IF (MONTHS_BETWEEN(SYSDATE, :OLD.OUT_DATE) >= 24) THEN
        DELETE FROM OUTGOING OUTG
        WHERE OUTG.OUT_ID = :OLD.OUT_ID;
        DBMS_OUTPUT.PUT_LINE('Row was deleted');
    ELSE
        RAISE too_early;
    END IF;
    EXCEPTION
        WHEN too_early THEN
            DBMS_OUTPUT.PUT_LINE('Too early to delete this record!');
end;

-- Test
BEGIN
    INSERT INTO V_OUT(OUT_ID, PROD_ID, MAN_NAME, QUANTITY, OUT_DATE) VALUES (1007, 1000, 'Sam Smith', 10, SYSDATE);
    INSERT INTO V_OUT(OUT_ID, PROD_ID, MAN_NAME, QUANTITY, OUT_DATE) VALUES (1008, 1001, 'Sam Smith', 10, '01.01.2000');
END;

BEGIN
    DELETE FROM V_OUT WHERE OUT_ID = 1007;
    DELETE FROM V_OUT WHERE OUT_ID = 1008;
END;
