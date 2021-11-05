-- UPDATE assessment SET $1 = $2 WHERE assessment_id = $3;


create or replace function set_grade(score_id text, grade int, assessment_id int) returns void as $$
begin
    execute 'update assessment set ' || score_id || ' = ' || grade || ' where assessment_id = '|| assessment_id || ';';
end;
$$ language plpgsql;


-- EXECUTE 'UPDATE assessment SET ' || quote_ident('score_1_1') || ' = '
--         || quote_nullable(4)
--         || ' WHERE assessment_id = '
--         || quote_nullable(33);

-- EXEC SQL BEGIN DECLARE SECTION;
-- const char *stmt = "SELECT * FROM ?;";
-- EXEC SQL END DECLARE SECTION;

-- EXEC SQL PREPARE mystmt FROM :stmt;
 
-- EXEC SQL EXECUTE mystmt USING 'project';

-- SELECT
--         p.title,
--         s.f_name,
--         s.l_name,
--         t.semester,
--         t.year,
--         a.graded,
--         a.assessment_id
--         FROM
--             prof pr
--         INNER JOIN assessment a 
--             ON pr.prof_email = a.prof_email
--         INNER JOIN student s 
--             ON s.student_id = a.student_id
--         INNER JOIN project p
--             ON s.proj_id = p.proj_id
--         INNER JOIN term t
--             ON t.term_id = a.term_id
--         WHERE
--             pr.prof_email = 'kenrick_mock@ak.edu' and p.term_id = get_current_term();



-- -- works when returning all projects for a professor. so close!
-- CREATE OR REPLACE FUNCTION get_assessments_display(p_email text)
-- RETURNS TABLE
-- (
--     title text, f_name text, l_name text, graded boolean, semester text, year int
-- )
-- LANGUAGE 'plpgsql'
-- AS $$
-- BEGIN
-- RETURN QUERY
--     SELECT
--         p.title,
--         s.f_name,
--         s.l_name,
--         t.semester,
--         t.year,
--         a.graded
--         FROM
--             prof pr
--         INNER JOIN assessment a 
--             ON pr.prof_email = a.prof_email
--         INNER JOIN student s 
--             ON s.student_id = a.student_id
--         INNER JOIN project p
--             ON s.proj_id = p.proj_id
--         INNER JOIN term t
--             ON t.term_id = a.term_id
--         -- INNER JOIN get_current_term()
--         --     ON t.term_id = get_current_term
--         WHERE
--             pr.prof_email = 'kenrick_mock@ak.edu';
-- END;
-- $$;

