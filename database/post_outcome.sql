-- there is no 'reqs_id' on the subtype, so we have to get that
-- info from another function.


create or replace function post_outcome(degree TEXT, s json ) returns int
AS $$
declare
success_tracker int;
f record;
g json;
begin

    if degree = 'CS' then

        insert into outcome_details_cs (
        cs_cat_id,
        outcome_description,
        order_float
        )
        select * from json_to_record(s) as x(
            cs_cat_id INT,
            outcome_description TEXT,
            cs_cat_id float
        ) returning id into success_tracker;

        return success_tracker;
    else

        insert into outcome_details_cse (
            cse_cat_id,
            outcome_description,
            order_float
            )
            select * from json_to_record(s) as x(
            cse_cat_id INT,
            outcome_description TEXT,
            order_float float
        ) returning id into success_tracker;
        return success_tracker;

-- select post_outcome(('text',1,'text',1,'text','text','text','text','text',99.0),'CS');

    end if;       
end; $$ language plpgsql;
