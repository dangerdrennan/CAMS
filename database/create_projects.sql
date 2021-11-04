CREATE TABLE IF NOT EXISTS project (
    proj_id SERIAL PRIMARY KEY,
    title TEXT,
    term_id int REFERENCES term(term_id)
);
