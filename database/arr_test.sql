
do $$
DECLARE
sub_arr new_sub[];
n new_sub;
i int;
p int:=5;
begin
   for counter in 1..p loop

    n:= ('score_id_should_be_here',1,'text',1,'text','text','text','text',99.0);
    select array_append(sub_arr, n) into sub_arr;
    -- raise notice 'n score_id is at: %', n.score_id;
    -- raise notice 'sub_arr_val score_id is at: %', sub_arr[1].score_id;
    -- insert into suboutcome_details_cse (
    --         outcome_cat_id,
    --         suboutcome_name,
    --         score_id, 
    --         suboutcome_description, 
    --         poor_description, 
    --         developing_description, 
    --         satisfactory_description, 
    --         excellent_description, 
    --         order_float
    --         )
    --         VALUES(
    --         sub_arr[counter].outcome_cat_id,
    --         sub_arr[1].suboutcome_name,
    --         sub_arr[1].score_id, 
    --         sub_arr[1].suboutcome_description, 
    --         sub_arr[1].poor_description, 
    --         sub_arr[1].developing_description, 
    --         sub_arr[1].satisfactory_description, 
    --         sub_arr[1].excellent_description, 
    --         sub_arr[1].order_float
    --     );

end loop;

select p('CS', sub_arr) into i;
 raise notice '%', i;


end; $$