CREATE TABLE IF NOT EXISTS project (
    proj_id SERIAL PRIMARY KEY,
    title text,
    term_id int REFERENCES term(term_id)
);
