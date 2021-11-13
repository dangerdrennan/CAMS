CREATE OR REPLACE FUNCTION get_assessments_by_term (sem TEXT, ye INTEGER)
RETURNS INTEGER AS $$
DECLARE
id integer;
BEGIN
select * from project INNER JOIN get_current_term() ON project.term_id = get_current_term;
SELECT * from assessment INNER JOIN get_term_id(sem, year) ON assessment.term_id = get_term_id;
return id;
END; $$  LANGUAGE 'plpgsql';

-- SELECT get_assessments_by_term('Fall', 2021);