create or replace function clear_assessments() returns void as $$
declare
a record;
begin
    FOR a IN SELECT assessment_id
        FROM assessment
        LOOP
            UPDATE assessment set score_1_1 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_1_2 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_1 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_2 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_2_3 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_1 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_2 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_3 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_4 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_5 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_3_6 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_1 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_2 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_5_3 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_6_1 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_6_2 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_7_1 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set score_7_2 = 0 where assessment_id = a.assessment_id;
            UPDATE assessment set graded = false where assessment_id = a.assessment_id;
                        
            END LOOP;
end;
$$ language plpgsql;