 DROP TABLE IF EXISTS assessment;

 CREATE TABLE assessment (
    assessment_id SERIAL PRIMARY KEY,
    prof_email TEXT REFERENCES prof(prof_email),
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    term_id INT REFERENCES term(term_id),
    degree TEXT CHECK (degree = 'CS' OR degree = 'CSE'),
    degree TEXT,
    graded BOOLEAN DEFAULT false
 );


do $$
DECLARE f record;

DECLARE g record;

BEGIN
   FOR f IN SELECT prof_email
   FROM prof
   WHERE
   is_grader = true
   LOOP
    FOR g IN SELECT student_id, degree
        FROM student
            LOOP
            INSERT INTO assessment (prof_email, student_id, term_id,degree)
                VALUES (f.prof_email, g.student_id, get_current_term(), g.degree);
            END LOOP;
    END LOOP;
END; $$;

ALTER TABLE assessment ADD COLUMN score_1_1 INTEGER;
ALTER TABLE assessment ADD COLUMN score_1_2 INTEGER;
ALTER TABLE assessment ADD COLUMN score_2_1 INTEGER;
ALTER TABLE assessment ADD COLUMN score_2_2 INTEGER;
ALTER TABLE assessment ADD COLUMN score_2_3 INTEGER;
ALTER TABLE assessment ADD COLUMN score_3_1 INTEGER;
ALTER TABLE assessment ADD COLUMN score_3_2 INTEGER;
ALTER TABLE assessment ADD COLUMN score_3_3 INTEGER;
ALTER TABLE assessment ADD COLUMN score_3_4 INTEGER;
ALTER TABLE assessment ADD COLUMN score_3_5 INTEGER;
ALTER TABLE assessment ADD COLUMN score_3_6 INTEGER;
ALTER TABLE assessment ADD COLUMN score_5_1 INTEGER;
ALTER TABLE assessment ADD COLUMN score_5_2 INTEGER;
ALTER TABLE assessment ADD COLUMN score_5_3 INTEGER;
ALTER TABLE assessment ADD COLUMN score_6_1 INTEGER;
ALTER TABLE assessment ADD COLUMN score_6_2 INTEGER;
ALTER TABLE assessment ADD COLUMN score_7_1 INTEGER;
ALTER TABLE assessment ADD COLUMN score_7_2 INTEGER;
