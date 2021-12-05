create or replace function get_sub_by_outcome(req int, degree text)
returns table (
    score_id text,
    sub_id int,
    sub_name text,
    sub_description text,
    sub_poor text,
    sub_dev text,
    sub_sat text,
    sub_ex text,
    sub_order float
)
AS $$
#variable_conflict use_column
declare
curr int := (select reqs_id from term where is_current = true);

begin
    if degree = 'CS' then
        return query select
            score_id,
            id,
            suboutcome_name,
            suboutcome_description,
            poor_description,
            developing_description,
            satisfactory_description,
            excellent_description,
            order_float
            from suboutcome_details_cs
            where outcome_cat_id = req
            and reqs_id = curr
            order by order_float;
    else
        return query select
            score_id,
            id,
            suboutcome_name,
            suboutcome_description,
            poor_description,
            developing_description,
            satisfactory_description,
            excellent_description,
            order_float
            from suboutcome_details_cse
            where outcome_cat_id = req
            and reqs_id = curr
            order by order_float;
        end if;
    end; $$
    language plpgsql;