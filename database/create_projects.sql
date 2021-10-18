CREATE TABLE IF NOT EXISTS project (
    proj_id SERIAL PRIMARY KEY,
    title VARCHAR (100),
    term_id int REFERENCES term(term_id)
);
