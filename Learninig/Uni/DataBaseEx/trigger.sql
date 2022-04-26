Q-- 8 вариант

-- 1) Запретить добавление нового менеджера в подчинение к менеджеру, у которого уже есть в подчинении 2 менеджера.
--               Добавляя кортеж в таком случае следует в качестве руководителя указать любого другого менеджера, кроме босса.
--               Если нет таких менеджеров, то руководителя не приписывать и  сделать пометку в атрибуте Comments.
CREATE OR REPLACE TRIGGER MAN_TRIG

BEFORE INSERT ON MANAGERS --BEFORE Значит перед, взаимодействуем только с n:new

FOR EACH ROW
DECLARE
    CURSOR notAvailableMans IS --курсорчик
        SELECT PARENT_ID
        FROM MANAGERS
        WHERE PARENT_ID IS NOT NULL
        GROUP BY PARENT_ID
        HAVING COUNT(PARENT_ID) >= 2; --выбираем менеджера с 2 и более подчинёнными
    CURSOR availableMans IS
        SELECT MAN_ID
        FROM MANAGERS
        WHERE PARENT_ID IS NOT NULL AND --выбираем любого менеджера у которого меньше двух подчинённых
            MAN_ID NOT IN (
                SELECT PARENT_ID
                FROM MANAGERS
                WHERE PARENT_ID IS NOT NULL
                GROUP BY PARENT_ID
                HAVING COUNT(PARENT_ID) >= 2
            );
    na notAvailableMans%ROWTYPE; -- нашли одного
    am availableMans%ROWTYPE; --нашли другого
BEGIN
    OPEN notAvailableMans; --открываем курсор
    FETCH notAvailableMans INTO na; --фетчим
    WHILE notAvailableMans%FOUND LOOP --циклично
        IF (:new.PARENT_ID = na.PARENT_ID) THEN --если верхний менеджер имеет двух подчинённых
            OPEN availableMans; --открываем второй (где меньше двух подчинённых)
            FETCH availableMans INTO am; --фетчим
            IF (availableMans%FOUND) THEN --если такой есть
                :new.PARENT_ID := am.MAN_ID; --то мы его присваиваем
            ELSE --если его нет
                :new.PARENT_ID := NULL; --то оставляем поле пустым
                :new.COMMENTS := 'Available parent managers not found'; --а в комментах отмечаем, что ничего не нашли
            END IF;
        END IF;
        FETCH notAvailableMans INTO na; --делаем фетч для цикла
    END LOOP; --конец
END; --конец

INSERT INTO MANAGERS VALUES (7000000005, 5000000000, 'TESTMAN_4', 0.05, '11/25/2022', 'Worker', 7000000001) --работает как часы

-- 2) Отслеживать удаление и изменение данных в таблице Cources, записывая в таблицу ARCHIVE пользователя,
-- который произвел изменения, дату  и время изменения (время Московское),
-- «старые» и «новые» значения атрибутов измененных и удаленных кортежей.
CREATE TABLE ARCHIVE (USER_NAME VARCHAR2(25), DATE_OF_CHANGE VARCHAR2(50), TIME_OF_CHANGE VARCHAR2(50), NUM_ROWS_CHANGED NUMBER, ACTION VARCHAR2(25)) --сделали архив
--                   имя юзера                 дата изменения              время                       количество строк            действие

create or replace package MainProject AS
rowca NUMBER;
end MainProject;
create or replace package body MainProject AS
begin
rowca:=0;
end;



CREATE OR REPLACE TRIGGER COUNT_COURSES_ARCHIVE --создаём триггер
AFTER UPDATE OR DELETE ON COURCES
FOR EACH ROW --триггер строковый потому что воздействует каждый раз, когда меняется строка
BEGIN
    MainProject.rowca := MainProject.rowca + 1;-- используем глобальную переменную rowca, 
END;                                     --определенную в пакете MainProject


CREATE OR REPLACE TRIGGER COURSES_ARCHIVE --второй триггер добавляет запись в архив
AFTER UPDATE OR DELETE ON COURCES
DECLARE --триггер операторный, выполняется по исполнению операции
act VARCHAR2(25); --действие
dat VARCHAR2(50); --дата
tim VARCHAR2(50); --время
usr VARCHAR2(25); --пользователь
crows NUMBER(5); --количество строк
BEGIN
    usr := apex_util.get_username(apex_util.get_current_user_id); --достаём юзера
    IF UPDATING THEN --если update
        act := 'Update'; --пихаем это в архив
    ELSE --иначче
        act := 'Delete';--пихаем другое
    END IF;
    tim := TO_CHAR(SYSDATE + interval '4' hour,'hh24:mi:ss'); --время достали
    dat := TO_CHAR(SYSDATE + interval '4' hour,'mm.dd.yyyy'); --дату достали
    IF (MainProject.rowca != 0) THEN --если изменены строки (хоть одна)
        INSERT INTO ARCHIVE(USER_NAME, DATE_OF_CHANGE, TIME_OF_CHANGE, NUM_ROWS_CHANGED, ACTION) VALUES (usr, dat, tim, MainProject.rowca, act); --вставляем в архив
    END IF;
    MainProject.rowca := 0; --обнуляем переменную
END;

--строковый триггер  срабатывает два раза, в то время как операторный - один
UPDATE COURCES SET VALUE = VALUE + 228 WHERE CUR_IDFROM = 4000000000
