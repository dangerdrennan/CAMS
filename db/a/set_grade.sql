-- UPDATE assessment SET $1 = $2 WHERE assessment_id = $3;


create or replace function set_grade(score_id text, grade int, assessment_id int) returns void as $$
declare
s_name text;
begin
    select 
    execute 'update assessment set ' || score_id || ' = ' || grade || ' where assessment_id = '|| assessment_id || ';';
end;
$$ language plpgsql;



-- NOTE: quick function made during major db refactoring to see what the easiest way to update the assessment table will be
-- made. Not implement as of date and needs to be tested from frontend. May or may not end up using. 11/20/21 -Phillip

create or replace function set_grade_by_id(id int, grade int, assessment_id int, degree text) returns void as $$
declare
s_name text;
begin
execute 'select suboutcomes_'|| (SELECT lower(degree)) ||' from sem_req where term_id = '|| term ||';' into f;

    execute 'select score_id from suboutcomes_'|| (SELECT lower(degree)) ||' where id = '|| id ||';' into s_name;
    execute 'update assessment set ' || s_name || ' = ' || grade || ' where assessment_id = '|| assessment_id || ';';
end;
$$ language plpgsql;