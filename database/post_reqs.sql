create or replace function post_reqs(outs int[], degree text) returns void
AS $$
declare
old_req_id int;
new_req_id int;
begin

    drop table if exists w;
    drop table if exists x;
    drop table if exists y;
    drop table if exists z;
    select reqs_id from term where is_current = true into old_req_id;
    insert into sem_req values (DEFAULT) returning id into new_req_id;
    update term set reqs_id = new_req_id where is_current = true;

    if degree = 'CS' then

        create table w as select * from outcome_details_cs
            where id = ANY(select unnest(outs));
        update w set id = nextval(pg_get_serial_sequence('outcome_details_cs', 'id'));
        update w set reqs_id = new_req_id;
        INSERT into outcome_details_cs table w;

        create table x as select * from suboutcome_details_cs
            where outcome_cat_id = ANY(select unnest(outs));
        update x set id = nextval(pg_get_serial_sequence('suboutcome_details_cs', 'id'));
        update x set reqs_id = new_req_id;
        INSERT into suboutcome_details_cs table x;

        create table y as select * from outcome_details_cse
            where reqs_id = old_req_id;
        update y set id = nextval(pg_get_serial_sequence('outcome_details_cse', 'id'));
        update y set reqs_id = new_req_id;
        INSERT into outcome_details_cse table y;

        create table z as select * from suboutcome_details_cse
            where reqs_id = old_req_id;
        update z set id = nextval(pg_get_serial_sequence('suboutcome_details_cse', 'id'));
        update z set reqs_id = new_req_id;
        INSERT into suboutcome_details_cse table z;

    else

        create table w as select * from outcome_details_cse
            where id = ANY(select unnest(outs));
        update w set id = nextval(pg_get_serial_sequence('outcome_details_cse', 'id'));
        update w set reqs_id = new_req_id;
        INSERT into outcome_details_cse table w;

        create table x as select * from suboutcome_details_cse
            where outcome_cat_id = ANY(select unnest(outs));
        update x set id = nextval(pg_get_serial_sequence('suboutcome_details_cse', 'id'));
        update x set reqs_id = new_req_id;
        INSERT into suboutcome_details_cse table x;

        create table y as select * from outcome_details_cs
            where reqs_id = old_req_id;
        update y set id = nextval(pg_get_serial_sequence('outcome_details_cs', 'id'));
        update y set reqs_id = new_req_id;
        INSERT into outcome_details_cs table y;

        create table z as select * from suboutcome_details_cs
            where reqs_id = old_req_id;
        update z set id = nextval(pg_get_serial_sequence('suboutcome_details_cs', 'id'));
        update z set reqs_id = new_req_id;
        INSERT into suboutcome_details_cs table z;

    end if;       

end; $$ language plpgsql;