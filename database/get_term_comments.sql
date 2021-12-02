create or replace function get_comments (outcome int, sem text, term_year INT, degree TEXT)

RETURNS TABLE(
    cat_id INT,
    sub_name text,
    comment text,
    prof_f_name text,
    prof_l_name text
)
AS $$

begin

if degree = 'CSE' then
return query
SELECT
        
SELECT p.f_name, p.l_name, comment
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
    where s.reqs_id = (select reqs_id from term where semester = 'Fall' and year = 2021)
    and t.term_id = (select term_id from term where semester = 'Fall' and year = 2021)
    and a.degree = 'CS';

    else 
    return query
        p.f_name, p.l_name, comment
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
    where s.reqs_id = (select reqs_id from term where semester = 'Fall' and year = 2021)
    and t.term_id = (select term_id from term where semester = 'Fall' and year = 2021)
    and a.degree = 'CSE';
    end if;
end; $$ language plpgsql;


CREATE TYPE public.display_comment AS
(
	f_name text,
	l_name text,
	content text
);