DROP DATABASE IF EXISTS cams;
DROP USER IF EXISTS cap_admin;

CREATE USER cams WITH PASSWORD 'pswd' CREATEDB;

GRANT pg_read_server_files, pg_write_server_files TO cams;

CREATE DATABASE cams WITH OWNER = cams;