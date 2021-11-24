CREATE TABLE project (
    proj_id SERIAL PRIMARY KEY,
    title TEXT,
    term_id int REFERENCES term(term_id)
);
