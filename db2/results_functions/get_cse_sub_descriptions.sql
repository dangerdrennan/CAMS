create or replace function get_cs_sub_descriptions(cat_id int) returns
table(
    suboutcome_name text,
    score_id text,
    suboutcome_description text
)
AS $$
begin
return query select
suboutcome_details_cse.suboutcome_name,
suboutcome_details_cse.score_id,
suboutcome_details_cse.suboutcome_description
 from suboutcome_details_cse where suboutcome_details_cse.outcome_cat_id = cat_id;
end; $$ language plpgsql;