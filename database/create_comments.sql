CREATE TABLE IF NOT EXISTS comment (
    comment_id serial PRIMARY KEY,
    assessment_id int REFERENCES assessment(assessment_id),
    comment text,
    score_id text
);

ALTER TABLE comment ADD CONSTRAINT num_vals UNIQUE (assessment_id, score_id);