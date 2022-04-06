CREATE TABLE Pub(
		Pub_id NUMBER(2) primary key,
		Pub_Name VARCHAR2(40),
		Adres VARCHAR2(50),
		City  VARCHAR2(40),
          	Tel   NUMBER(11)
           );
     
CREATE TABLE Books(
		B_id NUMBER(2),
		Pub_id NUMBER(2),
		B_name VARCHAR2(60)
           );
     
     
    -- Составной первичный ключ
     ALTER TABLE Books ADD CONSTRAINT B_PK
     PRIMARY KEY(B_id, Pub_id);
     
    -- Внешний ключ
     ALTER TABLE Books
     ADD CONSTRAINT B_P_FK
     FOREIGN KEY(Pub_id)
     REFERENCES Pub(Pub_id);
     
     /
-------------------------------------------------------------------------------------- 
--ЗАПОЛНЕНИЕ БД

INSERT INTO PUB VALUES (1,'МИР', 'ПОЛЯНКА 8','МОСКВА',4951112233);
INSERT INTO PUB VALUES (2,'МОСКВА', 'ТВЕРСКАЯ 12','МОСКВА',4954445566);