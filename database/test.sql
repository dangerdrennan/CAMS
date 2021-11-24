create or replace function post_reqs(outs int[], subs int[]) returns void
-- create or replace function post_reqs(outs int[]) returns void
AS $$
declare
outcome int;
sub int;
new_req_id int;
new_id int;
old_cat int;
begin
    drop table if exists key_values;
    CREATE TABLE key_values (k int primary key, v int);
    insert into sem_req values (DEFAULT);
    select MAX(id) from sem_req into new_req_id;
    raise notice 'new_req_id is at %', new_req_id;
    foreach outcome in array outs
        loop
            raise notice 'outcome is at %', outcome;
            
            insert into outcome_details_cs (
                reqs_id,
                cs_cat_id,
                outcome_description,
                order_float
            )
            select new_req_id, cs_cat_id, outcome_description, order_float from outcome_details_cs where id = outcome
            returning id into new_id;
            raise notice 'new_id is at %', new_id;
            insert into key_values(k,v) VALUES (outcome, new_id);
    end loop;
    
    foreach sub in array subs
        loop
            raise notice 'sub is at %', sub;
            insert into suboutcome_details_cs (
                
                suboutcome_name,
                reqs_id,
                score_id,
                outcome_cat_id,
                suboutcome_description,
                poor_description,
                developing_description,
                satisfactory_description,
                excellent_description,
                order_float
                        )
            select suboutcome_name, reqs_id, score_id, outcome_cat_id, suboutcome_description, 
                poor_description, developing_description, satisfactory_description, excellent_description, 
                order_float from suboutcome_details_cs where id = sub returning outcome_cat_id into old_cat;
                raise notice 'old_cat is at %', old_cat;
            update suboutcome_details_cs set outcome_cat_id = (select v from key_values where k = old_cat) where id = sub;
    end loop;
    
end; $$ language plpgsql;