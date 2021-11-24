-- select post_outcome(('text',1,'text',1,'text','text','text','text','text',99.0),'CS')

CREATE TYPE new_sub AS (
    score_id TEXT,
    outcome_cat_id INT,
    suboutcome_name TEXT,
    suboutcome_description TEXT,
    poor_description TEXT,
    developing_description TEXT,
    satisfactory_description TEXT,
    excellent_description TEXT,
    order_float float
);