CREATE TABLE IF NOT EXISTS term (
    term_id SERIAL PRIMARY KEY,
    semester VARCHAR (6),
    year int,
    is_current BOOLEAN
);

INSERT INTO term (semester, year, is_current) VALUES ('spring', 2021, FALSE);
INSERT INTO term (semester, year, is_current) VALUES ('fall', 2021, TRUE);