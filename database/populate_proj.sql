\copy project(proj_id, title) FROM 'project.csv' delimiter ',' CSV HEADER ;
SELECT setval('project_proj_id_seq', (SELECT MAX(proj_id) FROM project)+1);