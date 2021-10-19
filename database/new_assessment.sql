-- CREATE PROCEDURE new_assessment(email text, s_id integer, t_id integer)
-- LANGUAGE SQL
-- AS $$
--     INSERT INTO assessment(prof_email, student_id, term_id)
--     VALUES(email, s_id, t_id);   
-- $$;

CREATE OR REPLACE FUNCTION add_assessments_by_student (s_id INTEGER)
RETURNS void as $$
DECLARE
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

CREATE OR REPLACE FUNCTION add_assessments_by_prof (p_email TEXT)
RETURNS void as $$
DECLARE
	f record;
BEGIN
   FOR f IN SELECT student_id
   FROM student
   WHERE
   term_id = get_current_term()
   LOOP
        INSERT INTO assessment (prof_email, student_id, term_id)
            VALUES (p_email, f.student_id, get_current_term());
    END LOOP; 
END; $$  LANGUAGE 'plpgsql';


-- INSERT INTO assessment
--     (prof_email, student_id, term_id)
-- SELECT p_email, f.student_id, get_current_term()
-- WHERE
--     NOT EXISTS (
--         SELECT p_email FROM accessment WHERE student_id = f.student_id AND term_id = get_current_term()
--     );