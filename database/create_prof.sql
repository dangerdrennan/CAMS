CREATE TABLE IF NOT EXISTS prof (
    prof_id SERIAL PRIMARY KEY,
    f_name VARCHAR(25),
    l_name VARCHAR(100),
    department VARCHAR(50)
);