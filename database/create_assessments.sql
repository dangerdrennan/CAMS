DROP TABLE IF EXISTS assessment;

 CREATE TABLE assessment (
    assessment_id SERIAL PRIMARY KEY,
    prof_email TEXT REFERENCES prof(prof_email),
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    term_id INT REFERENCES term(term_id),
    degree TEXT CHECK (degree = 'CS' OR degree = 'CSE'),
    graded BOOLEAN DEFAULT false
 );


do $$
declare t record;
DECLARE f record;

DECLARE g record;

BEGIN
    For t in select term_id
        from term
        loop
        raise notice '%', t;
        FOR f IN SELECT prof_email
        FROM prof
        WHERE
        is_grader = true
        LOOP
            FOR g IN SELECT student_id, degree
                FROM student
                    LOOP
                        INSERT INTO assessment (prof_email, student_id, term_id, degree)
                            VALUES (f.prof_email, g.student_id, t.term_id, g.degree);
                            end loop;
                        END LOOP;
            END LOOP;
END; $$;

ALTER TABLE assessment ADD COLUMN score_1_1 integer default 0;
ALTER TABLE assessment ADD COLUMN score_1_2 integer default 0;
ALTER TABLE assessment ADD COLUMN score_2_1 integer default 0;
ALTER TABLE assessment ADD COLUMN score_2_2 integer default 0;
ALTER TABLE assessment ADD COLUMN score_2_3 integer default 0;
ALTER TABLE assessment ADD COLUMN score_3_1 integer default 0;
ALTER TABLE assessment ADD COLUMN score_3_2 integer default 0;
ALTER TABLE assessment ADD COLUMN score_3_3 integer default 0;
ALTER TABLE assessment ADD COLUMN score_3_4 integer default 0;
ALTER TABLE assessment ADD COLUMN score_3_5 integer default 0;
ALTER TABLE assessment ADD COLUMN score_3_6 integer default 0;
ALTER TABLE assessment ADD COLUMN score_5_1 integer default 0;
ALTER TABLE assessment ADD COLUMN score_5_2 integer default 0;
ALTER TABLE assessment ADD COLUMN score_5_3 integer default 0;
ALTER TABLE assessment ADD COLUMN score_6_1 integer default 0;
ALTER TABLE assessment ADD COLUMN score_6_2 integer default 0;
ALTER TABLE assessment ADD COLUMN score_7_1 integer default 0;
ALTER TABLE assessment ADD COLUMN score_7_2 integer default 0;