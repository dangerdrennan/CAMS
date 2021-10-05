DROP DATABASE IF EXISTS cams;

CREATE USER cams WITH PASSWORD 'cams' CREATEDB;

GRANT pg_read_server_files, pg_write_server_files TO cams;

CREATE DATABASE cams WITH OWNER = cams;