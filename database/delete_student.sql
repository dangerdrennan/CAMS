
CREATE OR REPLACE FUNCTION delete_student (id INTEGER)
RETURNS void as $$
declare
students_assigned int;
p_id integer;
BEGIN
select proj_id into
p_id from student where student_id = id;
raise notice 'Value: %', p_id;
select count(*) into
students_assigned from student where proj_id = p_id;
raise notice 'Value: %', students_assigned;
if students_assigned = 1 then
DELETE FROM project where proj_id = p_id;
else
DELETE FROM student where student_id = id;
end if;

-- select into
-- students_assigned select count(*) from s
-- DELETE FROM project WHERE NOT EXISTS (SELECT FROM student WHERE project.proj_id = student.student_id);
END; $$  LANGUAGE 'plpgsql';

-- PERFORM DELETE FROM project WHERE NOT EXISTS (SELECT FROM project WHERE student_id = id);