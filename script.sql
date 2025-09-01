drop schema if exists shop;

create schema shop;

use shop;

create table categories
(
    id    int auto_increment
        primary key,
    title varchar(255) not null
);

create table products
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    price       decimal      not null,
    description text         null,
    image       varchar(255) null,
    category_id int          null,
    constraint products_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade on delete set null
);

INSERT INTO categories (title) VALUES ('CPU'), ('GPU'), ('Monitors'), ('Motherboards');
INSERT INTO products (title, price, description, image, category_id)
VALUES ('Intel I5', 100, null, null, 1),
       ('Intel I7', 300, null, null, 1),
       ('AMD Ryzen 5', 150, null, null, 1),
       ('RTX 3070 TI', 400, null, null, 2);