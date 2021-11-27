-- there is no 'reqs_id' on the subtype, so we have to get that
-- info from another function.


create or replace function post_suboutcome(degree TEXT, s json ) returns int
AS $$
declare
success_tracker int;
f record;
g json;
new_reqs_id int;
cat text;
only_id int;
begin

select reqs_id from term where is_current = true into new_reqs_id;
    
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
            suboutcome_name text,
            score_id text, 
            suboutcome_description text, 
            poor_description text, 
            developing_description text, 
            satisfactory_description text, 
            excellent_description text, 
            order_float float
        ) returning id into success_tracker;
    select outcome_cat_id from subcoutcome_details_cs where id = success_tracker limit 1 into cat;
    update suboutcome_details_cs set reqs_id = new_reqs_id where id = success_tracker;
    select id from outcome_details_cs where reqs_id = new_reqs_id and cs_cat_id = cat into only_id;
    update suboutcome_details_cs set cs_cat_id = only_id;
        return only_id;
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
        ) returning id into success_tracker;
        select outcome_cat_id from subcoutcome_details_cse where id = success_tracker into cat;
        update suboutcome_details_cse set reqs_id = new_reqs_id where id = success_tracker;
        select id from outcome_details_cs where reqs_id = new_reqs_id and cse_cat_id = cat into only_id;
        update suboutcome_details_cs set cs_cat_id = only_id;

        return only_id;

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