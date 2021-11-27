
create or replace function post_outcome(
    degree TEXT,
    new_cat INT,
    new_description text
    ) returns int
AS $$
declare
id_tracker int;
f record;
new_reqs_id int;
begin
 select reqs_id from term where is_current = true into new_reqs_id;

    if degree = 'CS' then

        insert into outcome_details_cs (
        reqs_id,
        cs_cat_id,
        outcome_description,
        order_float
        )
        values(
            new_reqs_id,
            new_cat,
            new_description,
            new_cat::FLOAT
        )returning id into id_tracker;

    else

        insert into outcome_details_cse (
        reqs_id,
        cse_cat_id,
        outcome_description,
        order_float
        )
        values(
            new_reqs_id,
            new_cat,
            new_description,
            new_cat::FLOAT
        ) returning id into id_tracker;

    end if; 
    return id_tracker;      
end; $$ language plpgsql;
