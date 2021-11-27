create or replace function p(degree TEXT, VARIADIC s json[] ) returns int
AS $$
declare
success_tracker int;
f record;
g json;
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
        values (
            s[i]->>outcome_cat_id,
            s[i]->>suboutcome_name,
            s[i]->>score_id, 
            s[i]->>suboutcome_description, 
            s[i]->>poor_description, 
            s[i]->>developing_description, 
            s[i]->>satisfactory_description, 
            s[i]->>excellent_description, 
            s[i]->>order_float
        ) returning id into success_tracker;
    end loop;
         
        return success_tracker;
end; $$ language plpgsql;