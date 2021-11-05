DROP TABLE suboutcome_details_cse;

CREATE TABLE suboutcome_details_cse (
    cse_suboutcome_name TEXT PRIMARY KEY,
    score_id TEXT,
    outcome_cat_id TEXT,
    suboutcome_description TEXT,
    poor_description TEXT,
    developing_description TEXT,
    satisfactory_description TEXT,
    excellent_description TEXT
);

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '1.1',
        'score_1_1',
        '1',
        '1.	Identifies requirements and formulates solution by applying principles of engineering, science, and mathematics',
        'No attempt or fails to formulate accurately',
        'Formulates but key details are missing or confused',
        'Most details identified and key relationships identified, appropriate solution formulated',
        'Clearly identifies the challenge and  embedded issues and formulates an appropriate solution'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '1.2',
        'score_1_2',
        '1',
        '2.	Solves complex engineering problem by applying principles of engineering, science, and mathematics',
        'Incorrect application of engineering principles or fails to implement solutions',
        'Limited solution or only partly applies science, math, and engineering principles',
        'Reasonable solution using science, math, and engineering principles',
        'In-depth and comprehensive utilization of science, math, and engineering principles in solution'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '2.1',
        'score_2_1',
        '2',
        '1.	Creates a final product for evaluation that meets specified needs',
        'Does not create a final product, or the final product is especially poor',
        'Makes a start on a final product but is unable to meet final specifications',
        'Creates a satisfactory final product which meets defined specifications',
        'Creates an exceptional final product which exceeds expectations'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '2.2',
        'score_2_2',
        '2',
        '2.	Solution considers public health, safety, welfare, human, environmental, and economic factors',
        'Limited or no  consideration of specified factors',
        'Basic evaluation and consideration but has gaps',
        'Satisfactory consideration of specified factors ',
        'Exceptional and comprehensive consideration of specified factors with strong tie to engineering design'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '3.1',
        'score_3_1',
        '3',
        '1.	Effectively organizes and structures a presentation or document',
        'No logical structure',
        'Some structure but erratic jumps in topic',
        'Most information presented logically',
        'All information presented logically'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '3.2',
        'score_3_2',
        '3',
        '2.	Provides appropriate content to demonstrate  detailed knowledge of subject area',
        'No grasp of topic, cannot answer questions or extremely limited content',
        'Only rudimentary knowledge demonstrated',
        'At ease with content and provides some detail',
        'Full command of subject matter'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '3.3',
        'score_3_3',
        '3',
        '3.	Effectively communicates details appropriate to the audience, including questions',
        'Is unable to effectively communicate',
        'Only able to answer/explain in a limited manner; limited detail',
        'Provides sufficient detail to describe/answer questions',
        'Communicates  details exceptionally well'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '3.4',
        'score_3_4',
        '3',
        'None',
        '4.	Provides effective and appropriate visual aids and graphics',
        'Weak support of the material, text or diagrams hard to see or understand',
        'Mostly supports the material, most text and diagrams understandable',
        'Text and diagrams strongly reinforce the presentation'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '3.5',
        'score_3_5',
        '3',
        '5.	Writes using proper spelling and grammar',
        'Significant errors',
        'Several errors',
        'Minor errors',
        'Negligible errors'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '3.6',
        'score_3_6',
        '3',
        '6.	Delivers oral presentation effectively',
        'Significant delivery problems, little to no audience contact; much too long or much too short',
        'Several mispronunciation, occasional audience contact; too long or too short',
        'Clear voice, steady rate, some audience contact; slightly too long or too short',
        'Clear voice, steady rate, strong audience contact, enthusiastic, confident; on time'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '5.1',
        'score_5_1',
        '5',
        '1.	Understands and fulfills roles and responsibilities',
        'Does not fulfill team role duties',
        'Fulfills some, but not all, team role duties',
        'Fulfills team role duties',
        'Exceeds expectations with respect to team role duties'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '5.2',
        'score_5_2',
        '5',
        '2.	Listens and works with others',
        'Does not consider other team members'' ideas or concerns',
        'Sometimes considers other team members'' ideas or concerns',
        'Often addresses other team members'' ideas or concerns',
        'Is exceptionally adept at addressing other team members'' ideas or concerns'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '5.3',
        'score_5_3',
        '5',
        '3.	Communicates effectively with the group',
        'Does not communicate to other members regarding the project progress',
        'Provides terse outline of status of the project and relevant updates',
        'Provides updates on a regular basis',
        'Works exceptionally well to provide documentation of progress'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '6.1',
        'score_6_1',
        '6',
        '1.	Develops and conducts an appropriate engineering experiment to test a hypothesis ',
        'Unable to develop and conduct experiment',
        'Partially develops and conducts experiment or flaws in experimental design',
        'Satisfactorily develops and conducts experiment',
        'Exceeds expectations in developing and conducting experiment'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '6.2',
        'score_6_2',
        '6',
        '2.	Analyzes and interprets experimental data using engineering judgment',
        'Unable to analyze and interpret data',
        'Partially analyzes and interprets data, but gaps in analysis',
        'Satisfactorily analyzes and interprets data; uses engineering judgment',
        'Exceeds expectations in analysis and interpretation with engineering judgment'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '7.1',
        'score_7_1',
        '7',
        '1.	Demonstrates ability to independently learn the latest developments and technical issues surrounding a new topic',
        'Does not demonstrate an understanding of the technical challenges / issues surrounding the topic',
        'Demonstrates a vague understanding of the technical issues and the latest developments',
        'Demonstrates satisfactory knowledge of the technical issues and the latest developments',
        'Demonstrates exceptional knowledge of the technical issues and the latest developments'
    );

INSERT INTO suboutcome_details_cse(cse_suboutcome_name, score_id, outcome_cat_id, suboutcome_description, poor_description, developing_description, satisfactory_description, excellent_description)
    VALUES (
        '7.2',
        'score_7_2',
        '7',
        '2.	Utilizes appropriate learning strategies',
        'No or inappropriate learning strategy',
        'Some appropriate learning strategy',
        'Appropriate learning strategy',
        'Exceptional learning strategy'
    );