DROP DATABASE cams;
DROP USER cams;

CREATE USER cams WITH PASSWORD 'pswd' CREATEDB;

GRANT pg_read_server_files, pg_write_server_files TO cams;

CREATE DATABASE cams WITH OWNER = cams;