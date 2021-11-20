DROP DATABASE IF EXISTS camss;
DROP USER IF EXISTS camss;

CREATE USER camss WITH PASSWORD 'a' CREATEDB;

GRANT pg_read_server_files, pg_write_server_files TO camss;

CREATE DATABASE camss WITH OWNER = camss;