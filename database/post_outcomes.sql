
create or replace function post_outcome(
    degree TEXT,
    new_cat INT[],
    new_description text[]
    ) returns int
AS $$
declare
id_tracker int;
new_reqs_id int;
i int;
c int;
begin
    select MAX(id) from sem_req into new_reqs_id;
    select array_length(score_ids,1) into c;
    while i <= c
    if degree = 'CS' then
        while i <= c
        loop
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
        end loop;
    else
        while i <= c 
        loop
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
        end loop;
    end if; 
    return id_tracker;      
end; $$ language plpgsql;
