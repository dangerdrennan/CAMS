drop table test;
CREATE TABLE if not exists test2(
    cat_id int,
    s_id text,
    s_description text
);


select *
into test
from 
(select
    outcome_details_cs.cs_cat_id,
    score_id,
    suboutcome_description
    from outcome_details_cs
    INNER JOIN 
    suboutcome_details_cs 
    ON 
    suboutcome_details_cs.outcome_cat_id = outcome_details_cs.cs_cat_id) as table_alias;


-- CREATE or replace type big_table AS (
--     cat int,
--     subs text[]);

-- CREATE FUNCTION getfoo() RETURNS SETOF compfoo AS $$
--     SELECT fooid, fooname FROM foo
-- $$ LANGUAGE SQL;



-- create or replace function array_test(term int) returns set of big_table

-- -- table(
-- --     cat int,
-- --     subs text[] 
-- -- )
-- AS $$
-- declare
-- f int;
-- g int[];
-- sub text[];
-- big bigtable;
-- begin

-- select outcome_cats_cs from sem_req where term_id = 2 into g;
--     insert into 
--     foreach f in array g loop
--     insert into temp(cat) values (f)
--     -- raise info '%', f
--     execute 'insert into
--         select suboutcome_name, score_id, suboutcome_description
--         from suboutcome_details_cs where outcome_cat_id = '
--         || f || ' into tem where cat = '|| f ||';';
--     end loop;
-- end;
-- $$ language plpgsql;