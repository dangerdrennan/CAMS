SELECT
        p.title,
        s.f_name,
        s.l_name,
        t.semester,
        t.year,
        a.graded,
        a.assessment_id
        FROM
            prof pr
        INNER JOIN assessment a 
            ON pr.prof_email = a.prof_email
        INNER JOIN student s 
            ON s.student_id = a.student_id
        INNER JOIN project p
            ON s.proj_id = p.proj_id
        INNER JOIN term t
            ON t.term_id = a.term_id
        WHERE
            pr.prof_email = 'kenrick_mock@ak.edu' and p.term_id = get_current_term();



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

