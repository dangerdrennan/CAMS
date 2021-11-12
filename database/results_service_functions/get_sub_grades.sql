create or replace function sub_grades (score_id TEXT, degree TEXT)
RETURNS TABLE(
    total BIGINT,
    poor_count BIGINT,
    developing_count BIGINT,
    satisfactory_count BIGINT,
    excellent_count BIGINT
) AS $$
begin
RETURN QUERY EXECUTE 'SELECT count(*),
            sum(case when ' || score_id || ' = 1 then 1 else 0 end),
            sum(case when ' || score_id || ' = 2 then 1 else 0 end),
            sum(case when ' || score_id || ' = 3 then 1 else 0 end),
            sum(case when ' || score_id || ' = 4 then 1 else 0 end)
            from assessment where ' || score_id || ' is not null and degree = '''|| degree ||''' ;';
end; $$ language plpgsql;