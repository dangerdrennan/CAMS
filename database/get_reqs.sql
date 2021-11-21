create or replace function get_reqs() returns table(
    outcome_cats_cs INT [],
    outcome_cats_cse INT [],
    suboutcomes_cs INT [],
    suboutcomes_cse INT []
)
AS $$
#variable_conflict use_column
declare
cs_out int[];
cse_out int[];
cs_sub int[];
cse_sub int[];
rn int;
begin

drop table if exists reqs;

create temporary table if not exists reqs(
    outcome_cats_cs INT [],
    outcome_cats_cse INT [],
    suboutcomes_cs INT [],
    suboutcomes_cse INT []
);

select reqs_id from term where is_current = true into rn;
select array(select id from outcome_details_cs where reqs_id = rn) into cs_out;
select array(select id from outcome_details_cse where reqs_id = rn) into cse_out;
select array(select id from suboutcome_details_cs where reqs_id = rn) into cs_sub;
select array(select id from suboutcome_details_cse where reqs_id = rn) into cse_sub;


INSERT INTO reqs (outcome_cats_cs, outcome_cats_cse, suboutcomes_cs,suboutcomes_cse)
    VALUES (cs_out, cse_out, cs_sub, cse_sub);
return query select * from reqs;

end; $$ language plpgsql;


create or replace function get_reqs(sem text, year int) returns table(
    outcome_cats_cs INT [],
    outcome_cats_cse INT [],
    suboutcomes_cs INT [],
    suboutcomes_cse INT []
)
AS $$
#variable_conflict use_column
declare
cs_out int[];
cse_out int[];
cs_sub int[];
cse_sub int[];
t_id int;
begin

drop table if exists reqs;

create temporary table if not exists reqs(
    outcome_cats_cs INT [],
    outcome_cats_cse INT [],
    suboutcomes_cs INT [],
    suboutcomes_cse INT []
);

select reqs_id from term where term_id = get_term_id(sem, year) into t_id;
select array(select id from outcome_details_cs where reqs_id = t_id order by order_float) into cs_out;
select array(select id from outcome_details_cse where reqs_id = t_id order by order_float) into cse_out;
select array(select id from suboutcome_details_cs where reqs_id = t_id order by order_float) into cs_sub;
select array(select id from suboutcome_details_cse where reqs_id = t_id order by order_float) into cse_sub;


INSERT INTO reqs (outcome_cats_cs, outcome_cats_cse, suboutcomes_cs,suboutcomes_cse)
    VALUES (cs_out, cse_out, cs_sub, cse_sub);
return query select * from reqs;

end; $$ language plpgsql;