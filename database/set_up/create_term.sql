drop TABLE term;
CREATE TABLE IF NOT EXISTS term (
    term_id SERIAL PRIMARY KEY,
    reqs_id int REFERENCES sem_req(id),
    semester TEXT CHECK (semester = 'Summer' OR semester = 'Spring' OR semester = 'Fall'),
    year int CHECK (year > 2013 AND year < 3000),
    is_current BOOLEAN CHECK (is_current = true OR is_current = null),
    CONSTRAINT unique_term UNIQUE (semester, year)
);

INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Spring', 2018, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Fall', 2018, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Spring', 2019, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Fall', 2019, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Spring', 2020, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Fall', 2020, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Spring', 2021, null);
INSERT INTO term (reqs_id, semester, year, is_current) VALUES (1, 'Fall', 2021, true);
