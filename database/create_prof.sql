CREATE TABLE IF NOT EXISTS prof (
    prof_email TEXT PRIMARY KEY,
    f_name TEXT,
    l_name TEXT,
    department TEXT,
    is_admin BOOLEAN,
    is_grader BOOLEAN,
    curr_cap_prof BOOLEAN DEFAULT null UNIQUE CHECK (curr_cap_prof = true OR curr_cap_prof = null)
);

-- quick terminal command to add a prof for testing purposes
-- INSERT INTO prof (prof_email, f_name, l_name, department, is_admin, is_grader) VALUES ('myfacemakeschildrencry@gmail.com', 'phillip', 'drennan', 'department', false, false);