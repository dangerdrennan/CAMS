\copy prof(prof_email, f_name, l_name, department, is_admin, is_grader, curr_cap_prof) FROM 'prof.csv' delimiter ',' CSV HEADER ;
\copy project(proj_id, title, term_id) FROM 'project.csv' delimiter ',' CSV HEADER ;
\copy student(f_name,l_name,degree,proj_id,term_id) FROM 'student.csv' delimiter ',' CSV HEADER ;
\i helper_functions/get_current_term.sql
\i set_up/create_assessments.sql
\i helper_functions/student_assign.sql
\i helper_functions/new_assessment.sql
\i set_up/assign_capstone_prof.sql
\i set_up/create_outcome_details_cs.sql
\i set_up/create_outcome_details_cse.sql
\i set_up/create_suboutcome_details_cs.sql
\i set_up/create_suboutcome_details_cse.sql
\i set_up/create_new_sub.sql
\i helper_functions/set_grade.sql
\i helper_functions/get_grade.sql
\i set_up/create_comments.sql
\i helper_functions/set_current_term.sql
\i get_reqs.sql
\i post_reqs.sql
\i post_suboutcome.sql
\i get_term_comments.sql
\i results_functions/get_totes_pers.sql
\i results_functions/get_term_id.sql
\i results_functions/sub_grades.sql
\i results_functions/get_cs_sub_descriptions.sql
\i results_functions/get_cse_sub_descriptions.sql
\i results_functions/super_cs_grader.sql
\i results_functions/outcome_percents.sql
SELECT setval('project_proj_id_seq', (SELECT MAX(proj_id) FROM project));