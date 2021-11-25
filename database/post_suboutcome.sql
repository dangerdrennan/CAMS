-- there is no 'reqs_id' on the subtype, so we have to get that
-- info from another function.


create or replace function post_suboutcome(degree TEXT, s json ) returns void
AS $$
declare
test_name text;
f record;
g json;
begin



    
    -- for test_name in 
    -- loop
    -- raise notice '%', g;
    -- end loop;

    
    if degree = 'CS' then

        insert into suboutcome_details_cs (
        outcome_cat_id,
        suboutcome_name,
        score_id, 
        suboutcome_description, 
        poor_description, 
        developing_description, 
        satisfactory_description, 
        excellent_description, 
        order_float
        )
        select * from json_to_record(s) as x(
            outcome_cat_id int ,
            suboutcome_name text,
            score_id text, 
            suboutcome_description text, 
            poor_description text, 
            developing_description text, 
            satisfactory_description text, 
            excellent_description text, 
            order_float float
        );

    else

        insert into suboutcome_details_cse (
            outcome_cat_id,
            suboutcome_name,
            score_id, 
            suboutcome_description, 
            poor_description, 
            developing_description, 
            satisfactory_description, 
            excellent_description, 
            order_float
            )
            select * from json_to_record(s) as x(
            outcome_cat_id int ,
            suboutcome_name text,
            score_id text, 
            suboutcome_description text, 
            poor_description text, 
            developing_description text, 
            satisfactory_description text, 
            excellent_description text, 
            order_float float
        );

-- select post_outcome(('text',1,'text',1,'text','text','text','text','text',99.0),'CS');

    end if;       
end; $$ language plpgsql;

-- CREATE TYPE new_sub AS (
--     score_id TEXT,
--     outcome_cat_id INT,
--     suboutcome_description TEXT,
--     poor_description TEXT,
--     developing_description TEXT,
--     satisfactory_description TEXT,
--     excellent_description TEXT,
--     order_float float
-- );