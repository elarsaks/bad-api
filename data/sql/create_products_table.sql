create table products (
	id varchar(124) not null primary key,
	name varchar(255),
	category varchar(124),
	price decimal,
    manufacturer varchar(124),
    color text[],
	instock varchar(124)
);