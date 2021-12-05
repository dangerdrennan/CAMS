create or replace function get_outcome_percents(sem text, ye int, degree text) returns
table(
    cat_description text,
    cat_id int,
    poor_percent FLOAT,
    developing_percent FLOAT,
    satisfactory_percent FLOAT,
    excellent_percent FLOAT
)
AS $$
#variable_conflict use_column
declare
f text[];
g int[];
v text;
sub_id int;
reqs int[];
out_reqs int[];
out_req int;
req int;
t_id int;
r_id int;
term int;
score text;
t bigint;
p bigint;
d bigint;
s bigint;
e bigint;
pp float;
dp float;
sp float;
ep float;
begin

select term_id from term where semester = sem and year = ye into t_id;
select reqs_id from term where semester = sem and year = ye into r_id;
raise notice 'r_id is at %', r_id;
raise notice 't_id is at %', t_id;
execute 'select array(select distinct ( id ) from suboutcome_details_'|| (SELECT lower(degree)) ||' where reqs_id = '|| r_id ||' order by id)' into reqs;


drop table if exists curr;
create table if not exists curr(
    cat_id int,
    s_id text,
    id int,
    s_description text,
    poor_count bigint default 0,
    satisfactory_count bigint default 0,
    developing_count bigint default 0,
    excellent_count bigint default 0,
    poor_percent FLOAT,
    developing_percent FLOAT,
    satisfactory_percent FLOAT,
    excellent_percent FLOAT,
    total bigint
);

BEGIN
   FOREACH req IN array reqs
  Loop
  execute 'insert into curr(id) values ('|| req ||');
        update curr set s_id = (SELECT score_id from suboutcome_details_'|| (SELECT lower(degree)) ||' where id = ''' || req || ''') where id = '|| req ||';
        update curr set cat_id = (SELECT outcome_cat_id from suboutcome_details_'|| (SELECT lower(degree)) ||' where id = ''' || req || ''') where id = '|| req ||';
        update curr set s_description = (SELECT suboutcome_description from suboutcome_details_'|| (SELECT lower(degree)) ||' where id = ''' || req || ''') where id = '|| req ||';';
    END LOOP;
END;

-- execute 'update curr set cat_id =
--     (select '|| (SELECT lower(degree)) ||'_cat_id 
--     from outcome_details_'|| (SELECT lower(degree)) ||' 
--     where curr.cat_id = outcome_details_'|| (SELECT lower(degree)) ||'.id);';


for score in select s_id from curr
loop
execute 'select (select total from sub_grades('''|| score ||''', '''|| degree ||''', '|| t_id ||'))' into t;
execute 'select (select poor_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| t_id ||'))' into p;
execute 'select (select developing_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| t_id ||'))' into d;
execute 'select (select satisfactory_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| t_id ||'))' into s;
execute 'select (select excellent_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| t_id ||'))' into e;
update curr set total = t where s_id = score;
update curr set poor_count = p where s_id = score;
update curr set developing_count = d where s_id = score;
update curr set satisfactory_count = s where s_id = score;
update curr set excellent_count = e where s_id = score;

end loop;

for score in select s_id from curr
loop
select (poor_count/total::float) from curr where s_id = score into pp;
select (developing_count/total::float) from curr where s_id = score into dp;
select (satisfactory_count/total::float) from curr where s_id = score into sp;
select (excellent_count/total::float) from curr where s_id = score into ep;
end loop;



drop TABLE if exists percents;
create table if not exists percents(
    cat_description text, 
    cat_id int,
    poor_percent FLOAT,
    developing_percent FLOAT,
    satisfactory_percent FLOAT,
    excellent_percent FLOAT
);
update curr set total = 1 where total = 0;
update curr set poor_count = 0 where poor_count is null;
update curr set developing_count = 0 where developing_count is null;
update curr set satisfactory_count = 0 where satisfactory_count is null;
update curr set excellent_count = 0 where excellent_count is null;

execute 'select array(select distinct ('|| (SELECT lower(degree)) ||'_cat_id) from outcome_details_'|| (SELECT lower(degree)) ||' where reqs_id = '|| r_id ||' order by '|| (SELECT lower(degree)) ||'_cat_id)' into out_reqs;

BEGIN
   FOREACH out_req IN array out_reqs
  Loop
  raise notice 'whats the big idea %', out_req;
  execute 'insert into percents(cat_id, poor_percent, developing_percent, satisfactory_percent, excellent_percent)
            values (' || out_req || ',
            (select  ROUND(sum(poor_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| out_req ||'),
            (select ROUND(sum(developing_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| out_req ||'),
            (select ROUND(sum(satisfactory_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| out_req ||'),
            (select ROUND(sum(excellent_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| out_req ||'));';
    END LOOP;
    
END;


return query
execute 'select outcome_description, percents.cat_id, percents.poor_percent, percents.developing_percent, percents.satisfactory_percent, percents.excellent_percent
            from outcome_details_'|| (SELECT lower(degree)) ||'
            inner join percents on percents.cat_id = outcome_details_'|| (SELECT lower(degree)) ||'.'|| (SELECT lower(degree)) ||'_cat_id 
            where outcome_details_'|| (SELECT lower(degree)) ||'.reqs_id = '|| r_id ||'; ';

end; $$ language plpgsql;
