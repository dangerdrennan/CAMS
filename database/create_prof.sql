CREATE TABLE IF NOT EXISTS prof (
    prof_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    pswd VARCHAR(64),
    salt VARCHAR(25),
    f_name VARCHAR(25),
    l_name VARCHAR(100),
    department VARCHAR(50),
    is_admin BOOLEAN
);