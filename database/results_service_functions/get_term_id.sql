CREATE OR REPLACE FUNCTION get_term_id (sem TEXT, ye INTEGER)
RETURNS INTEGER AS $$
DECLARE
id integer;
BEGIN
SELECT term_id into id from term where semester = sem and year = ye;
return id;
END; $$  LANGUAGE 'plpgsql';

SELECT get_term_id('Fall', 2021);