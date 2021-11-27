create or replace function a(
    score_ids text[],
    outcome_cat_ids int[],
    suboutcome_names text[],
    suboutcome_descriptions text[],
    poor_descriptions text[],
    developing_descriptions text[],
    satisfactory_descriptions text[],
    excellent_descriptions text[]
    ) returns int
AS $$
declare
c int;
i int:=1;
success_tracker int;
begin
    select array_length(score_ids,1) into c;
    while i <= c
    loop
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
            values (
            outcome_cat_ids[i],
            suboutcome_names[i],
            score_ids[i], 
            suboutcome_descriptions[i], 
            poor_descriptions[i], 
            developing_descriptions[i], 
            satisfactory_descriptions[i], 
            excellent_descriptions[i], 
            outcome_cat_ids[i]
        ) returning id into success_tracker;
        i = i + 1;
    end loop;

    return success_tracker;
end; $$ language plpgsql;