create or replace function get_grade(assessment_id int,score_id text) returns integer as $$
declare
retval integer;
begin
    execute 'SELECT ' || score_id || ' from assessment  where assessment_id = ' || assessment_id || ';'
    into retval;
    return retval;
end;
$$ language plpgsql;