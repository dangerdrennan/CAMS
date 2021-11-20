DROP TABLE IF EXISTS outcome_details_cs;

CREATE TABLE outcome_details_cs (
    cs_cat_id INT PRIMARY KEY,
    outcome_description TEXT
);

INSERT INTO outcome_details_cs(cs_cat_id, outcome_description)
    VALUES (
        1,
        'Outcome 1: Analyze a complex computing problem and to apply principles of computing and other relevant disciplines to identify solutions.'
    );

INSERT INTO outcome_details_cs(cs_cat_id, outcome_description)
    VALUES (
        2,
        'Outcome 2: Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program''s discipline.'
    );

INSERT INTO outcome_details_cs(cs_cat_id, outcome_description)
    VALUES (
        3,
        'Outcome 3: Communicate effectively in a variety of professional contexts, including technical and non-technical audiences for business, end-user, client, and computing contexts.'
    );

INSERT INTO outcome_details_cs(cs_cat_id, outcome_description)
    VALUES (
        5,
        'Outcome 5: Function effectively as a member or leader of a team engaged in activities appropriate to the program/''s discipline.'
    );