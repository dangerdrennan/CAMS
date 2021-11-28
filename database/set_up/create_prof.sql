CREATE TABLE prof (
    prof_email TEXT PRIMARY KEY,
    f_name TEXT,
    l_name TEXT,
    department TEXT,
    is_admin BOOLEAN,
    is_grader BOOLEAN,
    curr_cap_prof BOOLEAN DEFAULT null UNIQUE CHECK (curr_cap_prof = true OR curr_cap_prof = null)
);
