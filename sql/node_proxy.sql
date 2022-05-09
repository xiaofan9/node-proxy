create database if not exists node_proxy;

use node_proxy;
create table if not exists proxy_info (
  id bigint unsigned not null auto_increment comment '主键', 
  proxy_key varchar(50) comment '生成的代理key，访问时用来判断应该代理什么url', 
  proxy_url varchar(500) comment '代理url', 
  create_time datetime default current_timestamp comment '创建时间', 
  update_time datetime default current_timestamp comment '更新时间'
);
