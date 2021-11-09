CREATE FUNCTION my_method(ids INT[]) RETURNS VOID AS $$ 
DECLARE
       ids INT[];
BEGIN
       RAISE NOTICE 'value of ids : %', ids;
END $$ LANGUAGE plpgsql;