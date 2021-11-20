create or replace function get_cs_sub_descriptions(cat_id int) returns
table(
    suboutcome_name text,
    score_id text,
    suboutcome_description text
)
AS $$
begin
return query select
suboutcome_details_cs.suboutcome_name,
suboutcome_details_cs.score_id,
suboutcome_details_cs.suboutcome_description
 from suboutcome_details_cs where suboutcome_details_cs.outcome_cat_id = cat_id;
end; $$ language plpgsql;