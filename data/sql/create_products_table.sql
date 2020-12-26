create table products (
	id varchar(124) not null primary key,
	name varchar(255),
	type varchar(124),
	price decimal,
    manufacturer varchar(124),
	instock varchar(124),
    color text[]
);