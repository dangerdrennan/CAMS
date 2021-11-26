create or replace function p(degree TEXT, VARIADIC s json[] ) returns int
AS $$
declare
success_tracker int;
f record;
g record;
i int;
arr_length int;

begin

select array_length ( s,1 ) into arr_length;

for i in 1..arr_length
    loop
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
        select * from json_to_record(s[i]) as x (
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
    end loop;
         
        return success_tracker;
end; $$ language plpgsql;