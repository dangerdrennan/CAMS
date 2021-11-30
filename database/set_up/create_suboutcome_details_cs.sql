CREATE TABLE suboutcome_details_cs (
    id serial primary key,
    suboutcome_name TEXT,
    reqs_id int REFERENCES sem_req(id),
    score_id TEXT,
    outcome_cat_id INT,
    suboutcome_description TEXT,
    poor_description TEXT,
    developing_description TEXT,
    satisfactory_description TEXT,
    excellent_description TEXT,
    order_float float
);

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '1.1',
        1,
        'score_1_1',
        1,
        '1.	Analyzes problem and formulates requirements for the problem',
        'No attempt or fails to analyze accurately',
        'Analyzes but key details are missing or confused',
        'Most details analyzed and key relationships identified',
        'Clearly analyzes the challenge and embedded issues',
        1.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '1.2',
        1,
        'score_1_2',
        1,
        '2.	Identifies solution by applying principles of computing',
        'Incorrect application of computing principles or fails to identify solutions',
        'Limited identification of solutions using computing principles',
        'Reasonable identification of solutions using computing principles',
        'In-depth and comprehensive utilization of computing principles, identification of solution well beyond expectations',
        2.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '2.1',
        1,
        'score_2_1',
        2,
        '1.	Produces a design strategy, including tasks and subtasks, timelines, and evaluation of progress',
        'Does not produce a design strategy, or the design strategy is especially poor',
        'Limited attempts to form a design strategy',
        'Produces a reasonable design strategy appropriate to the project',
        'Produces an exceptional design strategy which exceeds expectations',
        3.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '2.2',
        1,
        'score_2_2',
        2,
        '2.	Creates a final product for evaluation',
        'Does not create a final product, or the final product is especially poor',
        'Makes a start on a final product but is unable to meet final specifications',
        'Creates a satisfactory final product which meets defined specifications',
        'Creates an exceptional final product which exceeds expectations',
        3.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '2.3',
        1,
        'score_2_3',
        2,
        '3.	Evaluates computing-based solution',
        'Limited or no evaluation',
        'Basic evaluation but has gaps',
        'Satisfactory evaluation of solution, some utilization of computing principles (e.g. Big-O analysis, testing methodologies)',
        'Exceptional and comprehensive evaluation of solution with strong tie to computing principles',
        4.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '3.1',
        1,
        'score_3_1',
        3,
        '1.	Effectively organizes and structures a presentation or document',
        'No logical structure',
        'Some structure but erratic jumps in topic',
        'Most information presented logically',
        'All information presented logically',
        5.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '3.2',
        1,
        'score_3_2',
        3,
        '2.	Provides appropriate content to demonstrate  detailed knowledge of subject area',
        'No grasp of topic, cannot answer questions or extremely limited content',
        'Only rudimentary knowledge demonstrated',
        'At ease with content and provides some detail',
        'Full command of subject matter',
        6.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '3.3',
        1,
        'score_3_3',
        3,
        '3.	Effectively communicates details appropriate to the audience, including questions',
        'Is unable to effectively communicate',
        'Only able to answer/explain in a limited manner; limited detail',
        'Provides sufficient detail to describe/answer questions',
        'Communicates  details exceptionally well',
        7.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '3.4',
        1,
        'score_3_4',
        3,
        'None',
        '4.	Provides effective and appropriate visual aids and graphics',
        'Weak support of the material, text or diagrams hard to see or understand',
        'Mostly supports the material, most text and diagrams understandable',
        'Text and diagrams strongly reinforce the presentation',
        8.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '3.5',
        1,
        'score_3_5',
        3,
        '5.	Writes using proper spelling and grammar',
        'Significant errors',
        'Several errors',
        'Minor errors',
        'Negligible errors',
        9.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '3.6',
        1,
        'score_3_6',
        3,
        '6.	Delivers oral presentation effectively',
        'Significant delivery problems, little to no audience contact; much too long or much too short',
        'Several mispronunciation, occasional audience contact; too long or too short',
        'Clear voice, steady rate, some audience contact; slightly too long or too short',
        'Clear voice, steady rate, strong audience contact, enthusiastic, confident; on time',
        10.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '5.1',
        1,
        'score_5_1',
        5,
        '1.	Understands and fulfills roles and responsibilities',
        'Does not fulfill team role duties',
        'Fulfills some, but not all, team role duties',
        'Fulfills team role duties',
        'Exceeds expectations with respect to team role duties',
        11.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '5.2',
        1,
        'score_5_2',
        5,
        '2.	Listens and works with others',
        'Does not consider other team members'' ideas or concerns',
        'Sometimes considers other team members'' ideas or concerns',
        'Often addresses other team members'' ideas or concerns',
        'Is exceptionally adept at addressing other team members'' ideas or concerns',
        12.0
    );

INSERT INTO suboutcome_details_cs(suboutcome_name, reqs_id,  score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description, order_float)
    VALUES (
        '5.3',
        1,
        'score_5_3',
        5,
        '3.	Communicates effectively with the group ',
        'Does not communicate to other members regarding the project progress',
        'Provides terse outline of status of the project and relevant updates',
        'Provides updates on a regular basis',
        'Works exceptionally well to provide documentation of progress',
        13.0
    );