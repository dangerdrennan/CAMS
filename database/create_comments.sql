CREATE TABLE IF NOT EXISTS comments (
    comment_id int PRIMARY KEY,
    assessment_id int REFERENCES assessment(assessment_id),
    comment text,
    score_id int
);
