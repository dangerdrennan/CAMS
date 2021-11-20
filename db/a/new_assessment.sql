CREATE OR REPLACE FUNCTION add_assessments_by_student (s_id INTEGER)
RETURNS void as $$
DECLARE
	f record;
    g record;
BEGIN
    SELECT degree, term_id INTO g
    FROM
    student
    WHERE student_id = s_id;
    FOR f IN SELECT prof_email
    FROM prof
    WHERE
    is_grader = true
    LOOP
        INSERT INTO assessment (prof_email, student_id, term_id,degree)
            SELECT f.prof_email, s_id, g.term_id,g.degree
            WHERE
                NOT EXISTS (
                    SELECT * FROM assessment WHERE prof_email= f.prof_email AND student_id = s_id AND term_id = g.term_id
            );
    END LOOP; 
END; $$  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION add_assessments_by_prof (p_email TEXT)
RETURNS void as $$
DECLARE
	f record;
BEGIN
   FOR f IN SELECT student_id, degree
   FROM student
   WHERE
   term_id = get_current_term()
   LOOP
        INSERT INTO assessment
            (prof_email, student_id, term_id, degree)
        SELECT p_email, f.student_id, get_current_term(),f.degree
        WHERE
            NOT EXISTS (
                SELECT * FROM assessment WHERE prof_email= p_email AND student_id = f.student_id AND term_id = get_current_term()
            );
    END LOOP; 
END; $$  LANGUAGE 'plpgsql';