\copy prof(prof_email, f_name, l_name, department, is_admin, is_grader, curr_cap_prof) FROM 'prof.csv' delimiter ',' CSV HEADER ;
\copy project(proj_id, title, term_id) FROM 'project.csv' delimiter ',' CSV HEADER ;
\copy student(f_name,l_name,degree,proj_id,term_id) FROM 'student.csv' delimiter ',' CSV HEADER ;
\i get_current_term.sql
\i create_assessments.sql
\i student_assign.sql
\i new_assessment.sql
\i update_term.sql
\i populate_semester.sql
\i assign_capstone_prof.sql
\i create_sem_req.sql
\i create_outcome_details_cs.sql
\i create_outcome_details_cse.sql
\i create_suboutcome_details_cs.sql
\i create_suboutcome_details_cse.sql
\i set_grade.sql
\i get_grade.sql
\i create_comments.sql
\i delete_student.sql
SELECT setval('project_proj_id_seq', (SELECT MAX(proj_id) FROM project));