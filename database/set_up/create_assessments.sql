CREATE TABLE assessment (
    assessment_id SERIAL PRIMARY KEY,
    prof_email TEXT REFERENCES prof(prof_email),
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    term_id INT REFERENCES term(term_id),
    degree TEXT CHECK (degree = 'CS' OR degree = 'CSE'),
    graded BOOLEAN DEFAULT false
 );

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

do $$
DECLARE f record;

DECLARE g record;

BEGIN
        FOR f IN SELECT prof_email
        FROM prof
        WHERE
        is_grader = true
        LOOP
            FOR g IN SELECT student_id, term_id, degree
                FROM student
                    LOOP
                        INSERT INTO assessment (prof_email, student_id, term_id, degree)
                            VALUES (f.prof_email, g.student_id, g.term_id, g.degree);
                        END LOOP;
            END LOOP;
END; $$;



do $$
DECLARE
a record;

BEGIN
        FOR a IN SELECT assessment_id
        FROM assessment
        LOOP
             UPDATE assessment set score_1_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_1_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_3 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_3 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_4 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_5 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_6 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_3 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_6_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_6_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_7_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_7_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set graded = true where assessment_id = a.assessment_id;
                        
            END LOOP;
END; $$;


