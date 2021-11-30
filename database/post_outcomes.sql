create or replace function post_outcomes(
    degree TEXT,
    new_cat INT[],
    new_description text[],
    new_reqs_id int
    ) returns int
AS $$
declare
id_tracker int;
i int:=1;
c int;
begin

    
    select array_length(new_cat, 1) into c;
    
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
            new_cat[i]::INT,
            new_description[i]::TEXT,
            new_cat[i]::FLOAT
        )returning id into id_tracker;
        i:= i +1;
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
            new_cat[i],
            new_description[i],
            new_cat[i]::FLOAT
        ) returning id into id_tracker;
        i:= i + 1;

        end loop;
        
    end if;   
    return id_tracker;
end; $$ language plpgsql;