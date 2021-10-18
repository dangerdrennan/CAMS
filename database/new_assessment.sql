-- CREATE PROCEDURE new_assessment(email text, s_id integer, t_id integer)
-- LANGUAGE SQL
-- AS $$
--     INSERT INTO assessment(prof_email, student_id, term_id)
--     VALUES(email, s_id, t_id);   
-- $$;

CREATE OR REPLACE FUNCTION addAssessments (s_id integer)
RETURNS void as $$

declare
	f record;
BEGIN
   FOR f IN SELECT prof_email
   FROM prof
   WHERE
   is_grader = true
   LOOP
        INSERT INTO assessment (prof_email, student_id, term_id)
            VALUES (f.prof_email, s_id, get_current_term());
    END LOOP; 
END; $$  LANGUAGE 'plpgsql';
