CREATE TABLE IF NOT EXISTS sem_req (
    semester VARCHAR (6),
    year INT,
    outcome_cats_cs TEXT [],
    outcome_cats_cse TEXT [],
    suboutcomes_cs TEXT [],
    suboutcomes_cse TEXT []
);

INSERT INTO sem_req (semester, year) VALUES ('fall', 2021);
UPDATE sem_req SET outcome_cats_cs = ARRAY[1,2,3,5] WHERE semester = 'fall' AND year = 2021;
UPDATE sem_req SET outcome_cats_cse = ARRAY[1,2,3,5,6,7] WHERE semester = 'fall' AND year = 2021;
UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] WHERE semester = 'fall' AND year = 2021;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] WHERE semester = 'fall' AND year = 2021;
