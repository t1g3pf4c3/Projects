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
     
     
    -- ��������� ��������� ����
     ALTER TABLE Books ADD CONSTRAINT B_PK
     PRIMARY KEY(B_id, Pub_id);
     
    -- ������� ����
     ALTER TABLE Books
     ADD CONSTRAINT B_P_FK
     FOREIGN KEY(Pub_id)
     REFERENCES Pub(Pub_id);
     
     /
-------------------------------------------------------------------------------------- 
--���������� ��

INSERT INTO PUB VALUES (1,'���', '������� 8','������',4951112233);
INSERT INTO PUB VALUES (2,'������', '�������� 12','������',4954445566);