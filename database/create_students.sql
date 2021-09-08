CREATE TABLE IF NOT EXISTS cs_student (
    cs_student_id SERIAL PRIMARY KEY,
    f_name VARCHAR ( 25 ),
    l_name VARCHAR( 75 ),
    proj_id int REFERENCES project(proj_id)
);

CREATE TABLE IF NOT EXISTS cse_student (
    cse_student_id SERIAL PRIMARY KEY,
    f_name VARCHAR ( 25 ),
    l_name VARCHAR( 75 ),
    proj_id int REFERENCES project(proj_id)
);
