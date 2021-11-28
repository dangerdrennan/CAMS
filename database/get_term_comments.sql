create or replace function get_comments (sem text, term_year INT, degree TEXT)

RETURNS TABLE(
    cat_id INT,
    sub_name text,
    comment text,
    prof_f_name text,
    prof_l_name text,
    student_f_name text,
    student_l_name text
)
AS $$

begin

if degree = 'CSE' then
return query
SELECT
        o.cse_cat_id,
        s.suboutcome_name,
        c.comment,
        pr.f_name,
        pr.l_name,
        st.f_name,
        st.l_name
        FROM
            prof pr
        INNER JOIN assessment a 
            ON pr.prof_email = a.prof_email
        INNER JOIN comment c
            ON a.assessment_id = c.assessment_id
        INNER JOIN suboutcome_details_cse s
            ON c.score_id = s.score_id
        INNER JOIN outcome_details_cse o
            ON c.cat_id = o.id
        INNER JOIN student st 
            ON st.student_id = a.student_id
        INNER JOIN term t
            ON t.term_id = a.term_id
        INNER JOIN get_current_term()
            ON t.term_id = (select * from get_term_id(sem, term_year))
        where st.degree = 'CSE'
        order by o.order_float, s.order_float;

    else 
    return query
        SELECT
        o.cs_cat_id,
        s.suboutcome_name,
        c.comment,
        pr.f_name,
        pr.l_name,
        st.f_name,
        st.l_name
        FROM
            prof pr
        INNER JOIN assessment a 
            ON pr.prof_email = a.prof_email
        INNER JOIN comment c
            ON a.assessment_id = c.assessment_id
        INNER JOIN suboutcome_details_cs s
            ON c.score_id = s.score_id
        INNER JOIN outcome_details_cs o
            ON c.cat_id = o.id
        INNER JOIN student st 
            ON st.student_id = a.student_id
        INNER JOIN term t
            ON t.term_id = a.term_id
        INNER JOIN get_current_term()
            ON t.term_id = (select * from get_term_id(sem, term_year))
        where st.degree = 'CS'
        order by o.order_float, s.order_float;
    end if;
end; $$ language plpgsql;