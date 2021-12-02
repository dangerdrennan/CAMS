create or replace function test (num int, sem text, ye INT, degree TEXT)

RETURNS TABLE(
    s_name text,
    s_desc text,
    comments display_comment[]
)
AS $$
declare
sub text;
subs text[];
f record;
comments display_comment[];
dc display_comment;
curr_req int:= (select reqs_id from term where semester = sem and year = ye);
begin
    drop table helper;
    CREATE TABLE helper(
        s_name text,
        s_desc text,
        comments display_comment[]
    );

    -- select score_id from 
    --     suboutcome_details_cs 
    --     where outcome_cat_id = num 
    --     and reqs_id = curr_req
    --     into subs;

    




    for f in select score_id, suboutcome_name, suboutcome_description
        from suboutcome_details_cs
        where
        outcome_cat_id = num
        and reqs_id = curr_req
        loop


        -- SELECT ARRAY_AGG(ROW(s.id, s.first_name, s.last_name)::person) FROM people s
        -- INTO students
        -- WHERE s.id IN (
        --     SELECT e.student_id FROM student_class_enrollments e
        --     WHERE e.class_id = cid
        -- );
        SELECT ARRAY_AGG( ROW(p.f_name, p.l_name, c.comment)::display_comment)

                    FROM comment c 
                    LEFT JOIN assessment a
                        on a.assessment_id = c.assessment_id
                    LEFT JOIN term t
                        on a.term_id = t.term_id
                    LEFT JOIN sem_req sr
                        on sr.id = t.reqs_id
                    LEFT JOIN suboutcome_details_cs s 
                        on c.score_id = s.score_id
                    LEFT JOIN
                        prof p
                        on a.prof_email = p.prof_email
                    into comments
                    where s.reqs_id = (select reqs_id from term where semester = 'Fall' and year = 2021)
                    and t.term_id = (select term_id from term where semester = 'Fall' and year = 2021)
                    and c.score_id = f.score_id
                    and a.degree = 'CS';
        if comments is not null then
        insert into helper(s_name, s_desc, comments )
        values
        (
            f.suboutcome_name::text,
            f.suboutcome_description::text,
            comments
        );
        end if;
        end loop;

    

return query select * from helper;
end; $$ language plpgsql;
























-- create or replace function get_comments (sem text, year INT, degree TEXT)

-- RETURNS TABLE(
--     total BIGINT,
--     poor_count BIGINT,
--     developing_count BIGINT,
--     satisfactory_count BIGINT,
--     excellent_count BIGINT,
--     poor_percent float,
--     developing_percent float,
--     satis_percent float,
--     ex_percent float
-- )
-- AS $$
-- declare s_id text;
-- p_t bigint:= 0;
-- p_t_c bigint;
-- d_t bigint:= 0;
-- d_t_c bigint;
-- s_t bigint:= 0;
-- s_t_c bigint;
-- e_t bigint:= 0;
-- e_t_c bigint;
-- tot bigint;
-- major text := (SELECT lower(degree));
-- category int;
-- all_reqs int[];
-- score_ids text[];
-- past_term int:= (select get_term_id(sem, year));
-- begin

-- drop table if exists p;
-- create temporary table if not exists p (
--     totes BIGINT,
--     p_count BIGINT,
--     d_count BIGINT,
--     s_count BIGINT,
--     e_count BIGINT,
--     p_percent float,
--     d_percent float,
--     s_percent float,
--     e_percent float
-- );

-- execute 'select array(select id from outcome_details_'|| major ||' 
--     join term on outcome_details_'|| major ||'.reqs_id = term.reqs_id where term.term_id = '|| past_term ||' order by outcome_details_'|| major ||'.order_float);' into all_reqs;
-- foreach category in array all_reqs
--     loop
--     execute 'select array(select score_id from suboutcome_details_'|| major ||' 
--         join term on term.reqs_id = suboutcome_details_'|| major ||'.reqs_id 
--         where term.term_id = '|| past_term ||' and suboutcome_details_'|| major ||'.outcome_cat_id = '|| category ||'order by suboutcome_details_'|| major ||'.order_float);' into score_ids;
--     raise notice 'category is at %', category;
--     foreach s_id in array score_ids
--         loop
--             raise notice 's_id is at %', s_id;
--             execute 'select count('|| s_id ||') from assessment where '|| s_id ||' = 1 and term_id = '|| past_term ||' and degree = '''|| degree ||''';' into p_t_c;
--             p_t:= p_t + p_t_c;
--             raise notice '%', p_t;
--             execute 'select count('|| s_id ||') from assessment where '|| s_id ||' = 2 and term_id = '|| past_term ||' and degree = '''|| degree ||''';' into d_t_c;
--             d_t:= d_t + d_t_c;
--             raise notice '%', d_t;
--             execute 'select count('|| s_id ||') from assessment where '|| s_id ||' = 3 and term_id = '|| past_term ||' and degree = '''|| degree ||''';' into s_t_c;
--             s_t:= s_t + s_t_c;
--             raise notice '%', s_t;
--             execute 'select count('|| s_id ||') from assessment where '|| s_id ||' = 4 and term_id = '|| past_term ||' and degree = '''|| degree ||''';' into e_t_c;
--             e_t:= e_t + e_t_c;
--             raise notice '%', e_t;
--         end loop;



--     select p_t + d_t + s_t + e_t into tot;
--     raise notice 'total is at %', tot;

--     insert into p(totes, p_count, d_count, s_count, e_count, p_percent, d_percent, s_percent, e_percent)
--         values(
--             tot,
--             p_t, 
--             d_t, 
--             s_t, 
--             e_t, 
--             coalesce(ROUND(p_t/NULLIF(tot::numeric,0) * 100,2),0), 
--             coalesce(ROUND(d_t/NULLIF(tot::numeric,0) * 100,2),0), 
--             coalesce(ROUND(s_t/NULLIF(tot::numeric,0) * 100,2),0), 
--             coalesce(ROUND(e_t/NULLIF(tot::numeric,0) * 100,2),0)
--             );
--         p_t:= 0;
--         d_t:= 0;
--         s_t:= 0;
--         e_t:= 0;
--         tot:=0;
--     end loop;

-- return query select * from p;
-- end; $$ language plpgsql;

-- for 
-- RETURN QUERY EXECUTE '(SELECT '''||score_id||''',
--             count(*),
--             sum(case when ' || score_id || ' = 1 then 1 else 0 end),
--             sum(case when ' || score_id || ' = 2 then 1 else 0 end),
--             sum(case when ' || score_id || ' = 3 then 1 else 0 end),
--             sum(case when ' || score_id || ' = 4 then 1 else 0 end)
--             from assessment where 
--             '|| score_id || ' is not null and 
--             degree = '''|| degree ||'''  
--             and graded = true and term_id = '|| past_term ||');';