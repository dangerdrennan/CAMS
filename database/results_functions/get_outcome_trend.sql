create or replace function outcome_trends (cat_id int)
RETURNS TABLE(
    total BIGINT,
    poor_percentage float,
    developing_percentage float,
    satisfactory_percentage float,
    excellent_percentage float
) AS $$
begin
RETURN QUERY EXECUTE 'SELECT count(*),
            sum(case when ' || score_id || ' = 1 then 1 else 0 end),
            sum(case when ' || score_id || ' = 2 then 1 else 0 end),
            sum(case when ' || score_id || ' = 3 then 1 else 0 end),
            sum(case when ' || score_id || ' = 4 then 1 else 0 end)
            from assessment where ' || score_id || ' is not null and degree = '''|| degree ||''' ;';
end; $$ language plpgsql;