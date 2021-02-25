create database if not exists node_proxy;

use node_proxy;
create table if not exists proxy_info(id int auto_increment primary key not null, proxy_key varchar(20), proxy_url varchar(500));
