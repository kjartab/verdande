drop table verdande_user;
drop table verdande_token;

create table verdande_user(id varchar primary key, name varchar, email varchar);
create table verdande_token(token varchar primary key, vuid varchar, token_creation_time timestamptz, provider_access_token varchar);