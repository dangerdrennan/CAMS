create or replace function get_comments (sem text, term_year INT, degree TEXT)

RETURNS TABLE(
    cat_id INT,
    sub_name text,
    sub_desc text,
    comment text,
    prof_f_name text,
    prof_l_name text
)
AS $$
#variable_conflict use_column
begin

if degree = 'CS' then
return query
        
SELECT s.outcome_cat_id, s.suboutcome_name, s.suboutcome_description, c.comment, p.f_name, p.l_name
    FROM comment c 
    LEFT JOIN assessment a
        on a.assessment_id = c.assessment_id
    LEFT JOIN term t
        on a.term_id = t.term_id
    LEFT JOIN sem_req sr
        on sr.id = t.reqs_id
    LEFT JOIN suboutcome_details_cs s 
        on c.score_id = s.score_id
    LEFT JOIN
        prof p
        on a.prof_email = p.prof_email
    where s.reqs_id = (select reqs_id from term where semester = sem and year = term_year)
    and t.term_id = (select term_id from term where semester = sem and year = term_year)
    and a.degree = 'CS' order by s.suboutcome_name;

    else 
    return query

    
    select
        s.outcome_cat_id, s.suboutcome_name, s.suboutcome_description, c.comment, p.f_name, p.l_name
    FROM comment c 
    LEFT JOIN assessment a
        on a.assessment_id = c.assessment_id
    LEFT JOIN term t
        on a.term_id = t.term_id
    LEFT JOIN sem_req sr
        on sr.id = t.reqs_id
    LEFT JOIN suboutcome_details_cs s 
        on c.score_id = s.score_id
    LEFT JOIN
        prof p
        on a.prof_email = p.prof_email
    where s.reqs_id = (select reqs_id from term where semester = sem and year = term_year)
    and t.term_id = (select term_id from term where semester = sem and year = term_year)
    and a.degree = 'CSE' order by s.suboutcome_name;
    end if;
end; $$ language plpgsql;