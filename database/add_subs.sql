create or replace function add_subs(
    degree TEXT,
    outcome_cat_ids int[],
    score_ids text[],
    suboutcome_names text[],
    suboutcome_descriptions text[],
    poor_descriptions text[],
    developing_descriptions text[],
    satisfactory_descriptions text[],
    excellent_descriptions text[],
    new_reqs_id int
    ) returns int
AS $$
declare
c int;
new_cat int;
i int:=1;
success_tracker int;
begin

    select array_length(score_ids,1) into c;

    if degree = 'CS' or degree ='cs' then
    while i <= c
        loop
            insert into suboutcome_details_cs (
                reqs_id,
                suboutcome_name,
                score_id, 
                suboutcome_description, 
                poor_description, 
                developing_description, 
                satisfactory_description, 
                excellent_description, 
                order_float
                )
                values (
                new_reqs_id,
                suboutcome_names[i],
                score_ids[i], 
                suboutcome_descriptions[i], 
                poor_descriptions[i], 
                developing_descriptions[i], 
                satisfactory_descriptions[i], 
                excellent_descriptions[i], 
                outcome_cat_ids[i]
            ) returning id into success_tracker;
            select id from outcome_details_cs where cs_cat_id = outcome_cat_ids[i] into new_cat;
            update suboutcome_details_cs set outcome_cat_id = new_cat where id = success_tracker;
            execute 'ALTER TABLE assessment ADD COLUMN IF NOT EXISTS '|| score_ids[i] ||' INT default 0;';
            i = i + 1;
            
        end loop;


    else
        while i <= c
        loop
            insert into suboutcome_details_cse (
                reqs_id,
                suboutcome_name,
                score_id, 
                suboutcome_description, 
                poor_description, 
                developing_description, 
                satisfactory_description, 
                excellent_description, 
                order_float
                )
                values (
                new_reqs_id,
                suboutcome_names[i],
                score_ids[i], 
                suboutcome_descriptions[i], 
                poor_descriptions[i], 
                developing_descriptions[i], 
                satisfactory_descriptions[i], 
                excellent_descriptions[i], 
                outcome_cat_ids[i]
            ) returning id into success_tracker;
            select id from outcome_details_cse where cse_cat_id = outcome_cat_ids[i] into new_cat;
            update suboutcome_details_cse set outcome_cat_id = new_cat where id = success_tracker;
             execute 'ALTER TABLE assessment ADD COLUMN IF NOT EXISTS '|| score_ids[i] ||' INT default 0;';
            i = i + 1;
        end loop;
    end if;
    return success_tracker;
end; $$ language plpgsql;
