 DROP TABLE IF EXISTS assessment;

 CREATE TABLE assessment (
    assessment_id SERIAL PRIMARY KEY,
    prof_email VARCHAR( 100 ) REFERENCES prof(prof_email),
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    term_id INT REFERENCES term(term_id),
    degree TEXT CHECK (degree = 'cs' OR degree = 'cse'),
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




































-- DROP TABLE IF EXISTS cse_assessment;
-- CREATE TABLE cse_assessment (
--     prof_id INT REFERENCES prof(prof_id),
--     cse_student_id INT REFERENCES cse_student(cse_student_id),
--     graded BOOLEAN,
--     semester VARCHAR (5),
--     year INT,
--     outcome1p1_score INT,
--     outcome1p1_comment TEXT,
--     outcome1p2_score INT,
--     outcome1p2_comment TEXT,
--     outcome2p1_score INT,
--     outcome2p1_comment TEXT,
--     outcome2p2_score INT,
--     outcome2p2_comment TEXT,
--     outcome3p1_score INT,
--     outcome3p1_comment TEXT,
--     outcome3p2_score INT,
--     outcome3p2_comment TEXT,
--     outcome3p3_score INT,
--     outcome3p3_comment TEXT,
--     outcome3p4_score INT,
--     outcome3p4_comment TEXT,
--     outcome3p5_score INT,
--     outcome3p5_comment TEXT,
--     outcome3p6_score INT,
--     outcome3p6_comment TEXT,
--     outcome5p1_score INT,
--     outcome5p1_comment TEXT,
--     outcome5p2_score INT,
--     outcome5p2_comment TEXT,
--     outcome5p3_score INT,
--     outcome5p3_comment TEXT,
--     outcome6p1_score INT,
--     outcome6p1_comment TEXT,
--     outcome6p2_score INT,
--     outcome6p2_comment TEXT,
--     outcome7p1_score INT,
--     outcome7p1_comment TEXT,
--     outcome7p2_score INT,
--     outcome7p2_comment TEXT
-- );

-- do $$
-- DECLARE f record;

-- DECLARE g record;

-- BEGIN
--    FOR f IN SELECT prof_id
--    FROM prof
--    LOOP
--     FOR g IN SELECT cse_student_id
--         FROM cse_student
--             LOOP
--             INSERT INTO cse_assessment (prof_id, cse_student_id)
--                 VALUES (f.prof_id, g.cse_student_id);
--             END LOOP;
--     END LOOP;
-- END; $$;

-- DROP TABLE cs_assessment;

-- CREATE TABLE cs_assessment (
--     prof_id INT REFERENCES prof(prof_id),
--     cs_student_id INT REFERENCES cs_student(cs_student_id),
--     graded BOOLEAN,
--     semester VARCHAR (5),
--     year INT,
--     outcome1p1_score INT,
--     outcome1p1_comment TEXT,
--     outcome1p2_score INT,
--     outcome1p2_comment TEXT,
--     outcome2p1_score INT,
--     outcome2p1_comment TEXT,
--     outcome2p2_score INT,
--     outcome2p2_comment TEXT,
--     outcome2p3_score INT,
--     outcome2p3_comment TEXT,
--     outcome3p1_score INT,
--     outcome3p1_comment TEXT,
--     outcome3p2_score INT,
--     outcome3p2_comment TEXT,
--     outcome3p3_score INT,
--     outcome3p3_comment TEXT,
--     outcome3p4_score INT,
--     outcome3p4_comment TEXT,
--     outcome3p5_score INT,
--     outcome3p5_comment TEXT,
--     outcome3p6_score INT,
--     outcome3p6_comment TEXT,
--     outcome5p1_score INT,
--     outcome5p1_comment TEXT,
--     outcome5p2_score INT,
--     outcome5p2_comment TEXT,
--     outcome5p3_score INT,
--     outcome5p3_comment TEXT
-- );

-- do $$
-- DECLARE f record;

-- DECLARE g record;

-- BEGIN
--    FOR f IN SELECT prof_id
--    FROM prof
--    LOOP
--     FOR g IN SELECT cs_student_id
--         FROM cs_student
--             LOOP
--             INSERT INTO cs_assessment (prof_id, cs_student_id)
--                 VALUES (f.prof_id, g.cs_student_id);
--             END LOOP;
--     END LOOP;
-- END; $$;

-- creating some initial 'graded values'. Test and it worked.

-- INSERT INTO cs_assessment (
--     outcome1p1_score,
--     outcome1p1_comment,
--     outcome1p2_score,
--     outcome1p2_comment,
--     outcome2p1_score,
--     outcome2p1_comment,
--     outcome2p2_score,
--     outcome2p2_comment,
--     outcome2p3_score,
--     outcome2p3_comment,
--     outcome3p1_score,
--     outcome3p1_comment,
--     outcome3p2_score,
--     outcome3p2_comment,
--     outcome3p3_score,
--     outcome3p3_comment,
--     outcome3p4_score,
--     outcome3p4_comment,
--     outcome3p5_score,
--     outcome3p5_comment,
--     outcome3p6_score,
--     outcome3p6_comment,
--     outcome5p1_score,
--     outcome5p1_comment,
--     outcome5p2_score,
--     outcome5p2_comment,
--     outcome5p3_score,
--     outcome5p3_comment
-- )
--     VALUES (
--         4,
--         'good work',
--         3,
--         'was ok',
--         1,
--         'couldnt follow',
--         1,
--         'sloppy',
--         3,
--         'good not great',
--         4,
--         'inspired',
--         1,
--         'not good work',
--         1,
--         'not inspired',
--         4,
--         'near perfect',
--         4,
--         'future leader',
--         1,
--         'im embarrased for you',
--         4,
--         'excellent grasp of material',
--         4,
--         'bold and brash',
--         4,
--         'disruptive'
--                 );