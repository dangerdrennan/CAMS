CREATE OR REPLACE FUNCTION populate_semester()
RETURNS void as $$
DECLARE
	f record;
    g record;
BEGIN
   FOR f IN SELECT prof_email
    FROM prof
    WHERE
    is_grader = true
   LOOP
    FOR g IN SELECT student_id, degree, term_id
        FROM student
        WHERE term_id = get_current_term()
            LOOP
            INSERT INTO assessment (prof_email, student_id, term_id,degree)
            SELECT f.prof_email, g.student_id, g.term_id,g.degree
            WHERE
                NOT EXISTS (
                    SELECT * FROM assessment WHERE prof_email= f.prof_email AND student_id =  g.student_id AND term_id = g.term_id
            );
            END LOOP;
    END LOOP;
END; $$  LANGUAGE 'plpgsql';