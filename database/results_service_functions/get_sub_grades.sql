create or replace function sub_grades (score_id TEXT, degree TEXT)
RETURNS TABLE(
    total BIGINT,
    poor_count BIGINT,
    developing_count BIGINT,
    satisfactory_count BIGINT,
    excellent_count BIGINT
) AS $$

begin

RETURN QUERY EXECUTE 'SELECT count(*),
            sum(case when ' || score_id || ' = 1 then 1 else 0 end),
            sum(case when ' || score_id || ' = 2 then 1 else 0 end),
            sum(case when ' || score_id || ' = 3 then 1 else 0 end),
            sum(case when ' || score_id || ' = 4 then 1 else 0 end)
            from assessment where ' || score_id || ' is not null and degree = '''|| degree ||''' ;';


--  || score_id || ' FROM assessment where '|| score_id || '= 2 limit 5;';


end; $$ language plpgsql;


-- SELECT 
--     count(*) AS total,
--     sum(case when level = 'exec' then 1 else 0 end) AS ExecCount,
--     sum(case when level = 'personal' then 1 else 0 end) AS PersonalCount
-- FROM yourtable
-- GROUP BY distributor_id


-- CREATE OR REPLACE FUNCTION GetListings (lon double precision, lat double precision, schemas name[]) 
-- RETURNS TABLE(
--   schema VARCHAR(128),
--   id BIGINT,
--   product_name VARCHAR(128),
--   product_type SMALLINT,
--   product_subtype SMALLINT,
--   product_units SMALLINT,
--   product_info JSONB,
--   product_image VARCHAR(256),
--   is_featured BOOLEAN,
--   is_special BOOLEAN,
--   is_alert BOOLEAN,
--   distributor_name VARCHAR(128),
--   distributor_image VARCHAR(256)
-- ) AS $$
-- DECLARE
--   sch name;
--   n text;
--   t text;
-- BEGIN

--   n := to_char(lon,'999.999999999999999');
--   t := to_char(lat,'999.999999999999999');

--   FOREACH sch IN ARRAY schemas 
--   LOOP
--     RETURN QUERY 'SELECT ''' || sch || ''', product_name, product_type, product_subtype, product_units, product_info, product_image, is_featured, is_special, is_alert, distributor_name, distributor_image FROM ' || quote_ident(sch) || '.listing WHERE ST_Contains(area, ST_SetSrid(ST_MakePoint(' || n || ', ' || t || '), 4326))';
--   END LOOP;

--   RETURN;

-- END;
-- $$ LANGUAGE plpgsql STRICT;