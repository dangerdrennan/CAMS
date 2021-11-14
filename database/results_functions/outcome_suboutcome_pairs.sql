-- step 1, create a temp table

-- drop table test;
-- CREATE TABLE if not exists test(
--     cat_id int,
--     s_id text,
--     s_description text
-- );

-- step 2, populate it with all semester requirements

-- select *
-- into test
-- from 
-- (select
--     outcome_details_cs.cs_cat_id,
--     score_id,
--     suboutcome_description
--     from outcome_details_cs
--     INNER JOIN 
--     suboutcome_details_cs 
--     ON 
--     suboutcome_details_cs.outcome_cat_id = outcome_details_cs.cs_cat_id) as table_alias;

-- step 3, create a table consisting only of current semester requirements

-- drop TABLE dropper;
-- create table dropper(
--     s_id text
-- );

-- for loop to populate the table
-- do $$
-- DECLARE
-- f text[]:= (select suboutcomes_cs from sem_req where term_id = 2 );
-- v text;
-- BEGIN
--    FOREACH v IN array f
--   Loop
--   execute 'insert into dropper(s_id) values ('''||v||''');';
--     END LOOP;
-- END; $$;

-- outcome requirements where the same so I deleted one for testing
-- delete from dropper where s_id = 'score_1_1';
-- left join to delete
-- select * from dropper left join test on dropper.s_id = test.score_id;


-- adding columns to the table

-- alter table test add COLUMN poor_count bigint;
-- alter table test add column satisfactory_count;
-- alter table test add COLUMN developing_count bigint;
-- alter table test add COLUMN excellent_count bigint;
-- alter table test add COLUMN total bigint;
-- alter table test add column poor_percent FLOAT;
-- alter table test add column developing_percent FLOAT;
-- alter table test add column satisfactory_percent FLOAT;
-- alter table test add column excellent_percent FLOAT;


-- putting the counts of each score category using a helper function
do $$
declare score text;
declare t bigint;
declare p bigint;
declare d bigint;
declare s bigint;
declare e bigint;
declare pp float;
declare dp float;
declare sp float;
declare ep float;
begin
for score in select score_id from test
loop
select (select total from sub_grades(score, 'CS', 2)) into t;
select (select poor_count from sub_grades(score, 'CS', 2)) into p;
select (select developing_count from sub_grades(score, 'CS', 2)) into d;
select (select satisfactory_count from sub_grades(score, 'CS', 2)) into s;
select (select excellent_count from sub_grades(score, 'CS', 2)) into e;
update test set total = t where score_id = score;
update test set poor_count = p where score_id = score;
update test set developing_count = d where score_id = score;
update test set satisfactory_count = s where score_id = score;
update test set excellent_count = e where score_id = score;
-- raise notice '%', t;
-- raise notice '%', p;
-- raise notice '%', d;
-- raise notice '%', s;
-- raise notice '%', e;
-- raise notice '%', score;


-- execute  '
--     select * from sub_grades('''||score||''', ''CS'', 2)
--     into test.total, test.poor_count, test.developing_count, test.excellent_count
--     where where sub_grades.score_id = test.score_id;';
end loop;



for score in select score_id from test
loop
select (poor_count/total::float) from test where score_id = score into pp;
raise notice '%', pp;
select (developing_count/total::float) from test where score_id = score into dp;
raise notice '%', dp;
select (satisfactory_count/total::float) from test where score_id = score into sp;
raise notice '%', sp;
select (excellent_count/total::float) from test where score_id = score into ep;
raise notice '%', ep;

update test set poor_percent = ROUND(pp::numeric * 100,2) where score_id = score;
update test set developing_percent =  ROUND(dp::numeric * 100, 2) where score_id = score;
update test set satisfactory_percent =  ROUND(sp::numeric * 100, 2) where score_id = score;
update test set excellent_percent =  ROUND (ep::numeric * 100, 2) where score_id = score;

end loop;



end; $$ language plpgsql;


-- garbage, but the helpful kind.
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