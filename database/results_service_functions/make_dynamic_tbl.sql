CREATE OR REPLACE FUNCTION f(ids TEXT[]) RETURNS void AS
$BODY$
DECLARE
       f text;
BEGIN
    DROP TABLE IF EXISTS tem;
    CREATE TEMP TABLE tem (
       assessment_id INT,
       prof_email TEXT,
       student_id INT,
       term_id INT,
       degree TEXT
    );
    FOREACH f IN array ids loop
       execute 'alter table tem add column ' || f || ' integer;';
       RAISE NOTICE 'value of ids : %', f;
       end loop;
       

END;
$BODY$
LANGUAGE 'plpgsql' ;



-- CREATE OR REPLACE FUNCTION my_method(ids TEXT[]) RETURNS TABLE (

       -- assessment_id INT,
       -- prof_email TEXT,
       -- student_id INT,
       -- term_id INT,
       -- degree TEXT
-- )  LANGUAGE plpgsql
-- AS $$
-- DECLARE
--        f text;

-- BEGIN
--        FOREACH f IN array ids loop
--        ALTER TABLE links
--        ADD COLUMN active boolean;
--        RAISE NOTICE 'value of ids : %', f;
--        end loop;
       
-- END; $$;