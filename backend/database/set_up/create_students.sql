CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    degree TEXT,
    f_name TEXT,
    l_name TEXT,
    proj_id INT REFERENCES project(proj_id) ON DELETE CASCADE,
    term_id INT REFERENCES term(term_id) ON DELETE CASCADE
);