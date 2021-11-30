create or replace function get_sub_by_cat_id(req int, degree text)
returns table (
    score_id text,
    outcome_cat_id int,
    suboutcome_name text,
    suboutcome_description text,
    poor_description text,
    developing_description text,
    satisfactory_description text,
    excellent_description text
)
AS $$
#variable_conflict use_column
declare
curr int := (select reqs_id from term where is_current = true);

begin
    if degree = 'CS' then
        return query select
            score_id,
            outcome_cat_id,
            suboutcome_name,
            suboutcome_description,
            poor_description,
            developing_description,
            satisfactory_description,
            excellent_description
            from suboutcome_details_cs
            where reqs_id = curr
            and outcome_cat_id = req
            order by order_float;
    else
        return query select
            score_id,
            outcome_cat_id,
            suboutcome_name,
            suboutcome_description,
            poor_description,
            developing_description,
            satisfactory_description,
            excellent_description
            from suboutcome_details_cse
            where reqs_id = curr
            and outcome_cat_id = req
            order by order_float;
        end if;
    end; $$
    language plpgsql;