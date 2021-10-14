\copy prof(prof_email, f_name, l_name, department, is_admin, is_grader) FROM 'prof.csv' delimiter ',' CSV HEADER ;
\copy project(proj_id, title) FROM 'project.csv' delimiter ',' CSV HEADER ;
\copy student(f_name,l_name,degree,proj_id) FROM 'student.csv' delimiter ',' CSV HEADER ;
\i create_sem_req.sql
\i create_outcome_details_cs.sql
\i create_outcome_details_cse.sql
\i create_suboutcome_details_cs.sql
\i create_suboutcome_details_cse.sql
\i create_assessments.sql
\i student_assign.sql
SELECT setval('project_proj_id_seq', (SELECT MAX(proj_id) FROM project));
-- INSERT INTO student (degree, f_name, l_name, proj_id) VALUES ('cs', 'frank', 'tank', find_id('hola'));