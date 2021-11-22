CREATE TABLE IF NOT EXISTS sem_req (
    term_reqs SERIAL PRIMARY KEY,
    term_id INTEGER REFERENCES term(term_id),
    outcome_cats_cs TEXT [],
    outcome_cats_cse TEXT [],
    suboutcomes_cs TEXT [],
    suboutcomes_cse TEXT []
);
INSERT INTO sem_req (term_id) VALUES (1);
UPDATE sem_req SET outcome_cats_cs = ARRAY[3,5] WHERE term_id = 1;
UPDATE sem_req SET outcome_cats_cse = ARRAY[3,5,6,7] WHERE term_id = 1;

INSERT INTO sem_req (term_id) VALUES (2);
UPDATE sem_req SET outcome_cats_cs = ARRAY[3,5] WHERE term_id = 2;
UPDATE sem_req SET outcome_cats_cse = ARRAY[3,5,6,7] WHERE term_id = 2;

INSERT INTO sem_req (term_id) VALUES (3);
UPDATE sem_req SET outcome_cats_cs = ARRAY[3,5] WHERE term_id = 3;
UPDATE sem_req SET outcome_cats_cse = ARRAY[3,5,6,7] WHERE term_id = 3;

INSERT INTO sem_req (term_id) VALUES (4);
UPDATE sem_req SET outcome_cats_cs = ARRAY[3,5] WHERE term_id = 4;
UPDATE sem_req SET outcome_cats_cse = ARRAY[3,5,6,7] WHERE term_id = 4;

INSERT INTO sem_req (term_id) VALUES (5);
UPDATE sem_req SET outcome_cats_cs = ARRAY[1,2,3,5] WHERE term_id = 5;
UPDATE sem_req SET outcome_cats_cse = ARRAY[1,2,3,5,6,7] WHERE term_id = 5;

INSERT INTO sem_req (term_id) VALUES (6);
UPDATE sem_req SET outcome_cats_cs = ARRAY[1,2,3,5] WHERE term_id = 6;
UPDATE sem_req SET outcome_cats_cse = ARRAY[1,2,3,5,6,7] WHERE term_id = 6;

INSERT INTO sem_req (term_id) VALUES (7);
UPDATE sem_req SET outcome_cats_cs = ARRAY[1,2,3,5] WHERE term_id = 7;
UPDATE sem_req SET outcome_cats_cse = ARRAY[1,2,3,5,6,7] WHERE term_id = 7;

INSERT INTO sem_req (term_id) VALUES (8);
UPDATE sem_req SET outcome_cats_cs = ARRAY[1,2,3,5] WHERE term_id = 8;
UPDATE sem_req SET outcome_cats_cse = ARRAY[1,2,3,5,6,7] WHERE term_id = 8;

UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 1;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 1;

UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 2;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 2;


UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 3;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 3;


UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 4;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 4;


UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 5;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 5;


UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 6;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 6;


UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 7;
UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 7;


UPDATE sem_req 
    SET suboutcomes_cs = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_2_3', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3'] 
    WHERE term_id = 8;

UPDATE sem_req 
    SET suboutcomes_cse = ARRAY['score_1_1','score_1_2','score_2_1','score_2_2', 'score_3_1','score_3_2','score_3_3','score_3_4','score_3_5','score_3_6','score_5_1','score_5_2','score_5_3','score_6_1','score_6_2','score_7_1','score_7_2'] 
    WHERE term_id = 8;