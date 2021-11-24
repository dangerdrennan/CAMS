CREATE TABLE comment (
    comment_id serial PRIMARY KEY,
    cat_id int,
    assessment_id int REFERENCES assessment(assessment_id) ON DELETE CASCADE,
    comment text,
    score_id text
);

ALTER TABLE comment ADD CONSTRAINT num_vals UNIQUE (assessment_id, score_id);