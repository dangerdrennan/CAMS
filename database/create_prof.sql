CREATE TABLE IF NOT EXISTS prof (
    prof_email VARCHAR(100) PRIMARY KEY,
    f_name VARCHAR(25),
    l_name VARCHAR(100),
    department VARCHAR(50),
    is_admin BOOLEAN,
    is_grader BOOLEAN
);