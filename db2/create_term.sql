drop TABLE term;
CREATE TABLE IF NOT EXISTS term (
    term_id SERIAL PRIMARY KEY,
    semester TEXT CHECK (semester = 'Summer' OR semester = 'Spring' OR semester = 'Fall'),
    year int CHECK (year > 2013 AND year < 3000),
    is_current BOOLEAN CHECK (is_current = true OR is_current = null),
    CONSTRAINT unique_term UNIQUE (semester, year)
);

begin;
INSERT INTO term (semester, year, is_current) VALUES ('Spring', 2018, null);
INSERT INTO term (semester, year, is_current) VALUES ('Fall', 2018, null);
INSERT INTO term (semester, year, is_current) VALUES ('Spring', 2019, null);
INSERT INTO term (semester, year, is_current) VALUES ('Fall', 2019, null);
INSERT INTO term (semester, year, is_current) VALUES ('Spring', 2020, null);
INSERT INTO term (semester, year, is_current) VALUES ('Fall', 2020, null);
INSERT INTO term (semester, year, is_current) VALUES ('Spring', 2021, null);
INSERT INTO term (semester, year, is_current) VALUES ('Fall', 2021, true);
commit;