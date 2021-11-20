DROP TABLE IF EXISTS outcome_details_cs;

CREATE TABLE outcome_details_cs (
    id serial primary key,
    reqs_id int REFERENCES sem_req(id),
    cs_cat_id INT,
    outcome_description TEXT,
    order_float float
);

INSERT INTO outcome_details_cs(reqs_id, cs_cat_id, outcome_description, order_float)
    VALUES (
        1,
        1,
        'Outcome 1: Analyze a complex computing problem and to apply principles of computing and other relevant disciplines to identify solutions.',
        1.0
    );

INSERT INTO outcome_details_cs(reqs_id, cs_cat_id, outcome_description, order_float)
    VALUES (
        1,
        2,
        'Outcome 2: Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program''s discipline.',
        2.0
    );

INSERT INTO outcome_details_cs(reqs_id, cs_cat_id, outcome_description, order_float)
    VALUES (
        1,
        3,
        'Outcome 3: Communicate effectively in a variety of professional contexts, including technical and non-technical audiences for business, end-user, client, and computing contexts.',
        3.0
    );

INSERT INTO outcome_details_cs(reqs_id, cs_cat_id, outcome_description, order_float)
    VALUES (
        1,
        5,
        'Outcome 5: Function effectively as a member or leader of a team engaged in activities appropriate to the program/''s discipline.',
        4.0
    );