create or replace function  sub_results_past (score_id TEXT)
RETURNS TABLE(
    sub_desc TEXT,
    total BIGINT,
    poor_scores BIGINT,
    developing_scores BIGINT,
    satisfactory_scores BIGINT,
    excellent_scores BIGINT
) AS $$
declare
sub_d TEXT;
begin
--EXECUTE 'SELECT suboutcome_description from suboutcome_details_cs where score_id = '''|| score_id ||''';'
RETURN QUERY EXECUTE
'SELECT suboutcome_details_cs.suboutcome_description, sub_grades.* from suboutcome_details_cs, sub_grades('''||score_id||''', ''CS'') where suboutcome_details_cs.score_id = '''|| score_id ||''';';
end; $$ language plpgsql;

--SELECT * from prof, student where prof_email = 'ginandjuice@fbi.gov' and student_id = 5;  
--select prof.prof_email, sub_grades.total from prof, sub_grades('score_1_1', 'CS') where prof.prof_email = 'rowling@potter.co.uk';