DROP TABLE IF EXISTS outcome_details_cse;

CREATE TABLE outcome_details_cse  (
    cse_cat_id INT PRIMARY KEY,
    outcome_description TEXT
);

INSERT INTO outcome_details_cse(cse_cat_id, outcome_description)
    VALUES (
        1,
        'Outcome 1: An ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.'
    );

INSERT INTO outcome_details_cse(cse_cat_id, outcome_description)
    VALUES (
        2,
        'Outcome 2: An ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.'
    );

INSERT INTO outcome_details_cse(cse_cat_id, outcome_description)
    VALUES (
        3,
        'Outcome 3: An ability to communicate effectively with a range of audiences, including technical and non-technical audiences for business, end-user, client, and computing contexts.'
    );

INSERT INTO outcome_details_cse(cse_cat_id, outcome_description)
    VALUES (
        5,
        'Outcome 5: An ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.'
        );

INSERT INTO outcome_details_cse(cse_cat_id, outcome_description)
    VALUES (
        6,
        'Outcome 6: An ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.'
    );

INSERT INTO outcome_details_cse(cse_cat_id, outcome_description)
    VALUES (
        7,
        'Outcome 7: An ability to acquire and apply new knowledge as needed, using appropriate learning strategies.'
    );