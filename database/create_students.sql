DROP TABLE IF EXISTS student;
CREATE TABLE IF NOT EXISTS student (
    student_id SERIAL PRIMARY KEY,
    degree VARCHAR( 3 ),
    f_name VARCHAR( 25 ),
    l_name VARCHAR( 75 ),
    proj_id INT REFERENCES project(proj_id) ON DELETE CASCADE,
    term_id INT REFERENCES term(term_id) ON DELETE CASCADE
);