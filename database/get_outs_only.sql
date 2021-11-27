create or replace function get_outs_only(degree text)
returns table (
    cat_id int,
    out_id int,
    out_desc text,
    out_order float
)
AS $$
begin
    if degree = 'CS' then
        return query select
            o.cs_cat_id,
            o.id,
            o.outcome_description,
            o.order_float
            from outcome_details_cs o
            inner join term t
                on o.reqs_id = t.reqs_id
            where t.is_current = true
            order by
                o.order_float;
    else
        return query select
                o.cse_cat_id,
                o.id,
                o.outcome_description,
                o.order_float
                from outcome_details_cse o
                inner join term t
                    on o.reqs_id = t.reqs_id
                where t.is_current = true
                order by
                    o.order_float;
        end if;
    end; $$
    language plpgsql;