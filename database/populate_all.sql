\copy prof(f_name,l_name,department) FROM 'prof.csv' delimiter ',' CSV HEADER ;
\copy project(proj_id, title) FROM 'project.csv' delimiter ',' CSV HEADER ;
\copy cs_student(f_name,l_name,proj_id) FROM 'cs_student.csv' delimiter ',' CSV HEADER ;
\copy cse_student(f_name,l_name,proj_id) FROM 'cse_student.csv' delimiter ',' CSV HEADER ;
\i create_assessments.sql