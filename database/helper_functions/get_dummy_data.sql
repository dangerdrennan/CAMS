create or replace function get_dummy_data() returns void as $$
declare
a record;
begin
    FOR a IN SELECT assessment_id
        FROM assessment
        LOOP
            UPDATE assessment set score_1_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_1_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_3 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_3 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_4 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_5 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_6 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_3 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_6_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_6_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_7_1 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set score_7_2 = (SELECT floor(random()*(4))+1) where assessment_id = a.assessment_id;
            UPDATE assessment set graded = true where assessment_id = a.assessment_id;
                        
            END LOOP;
end;
$$ language plpgsql;