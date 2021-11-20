\copy prof(prof_email, f_name, l_name, department, is_admin, is_grader, curr_cap_prof) FROM 'prof.csv' delimiter ',' CSV HEADER ;
\copy project(proj_id, title, term_id) FROM 'project.csv' delimiter ',' CSV HEADER ;
\copy student(f_name,l_name,degree,proj_id,term_id) FROM 'student.csv' delimiter ',' CSV HEADER ;
\i a/get_current_term.sql
\i a/create_assessments.sql
\i a/student_assign.sql
\i a/new_assessment.sql
\i a/update_term.sql
\i a/populate_semester.sql
\i a/assign_capstone_prof.sql
\i a/create_sem_req.sql
\i a/create_outcome_details_cs.sql
\i a/create_outcome_details_cse.sql
\i a/create_suboutcome_details_cs.sql
\i a/create_suboutcome_details_cse.sql
\i a/set_grade.sql
\i a/get_grade.sql
\i a/create_comments.sql
\i get_reqs.sql
\i results_functions/get_term_id.sql
\i results_functions/sub_grades.sql
\i results_functions/get_cs_sub_descriptions.sql
\i results_functions/get_cse_sub_descriptions.sql
\i results_functions/super_cs_grader.sql
\i results_functions/outcome_percents.sql
SELECT setval('project_proj_id_seq', (SELECT MAX(proj_id) FROM project));