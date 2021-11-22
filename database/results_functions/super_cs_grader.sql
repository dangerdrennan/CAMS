create or replace function super_cs_grader(sem text, ye int, degree text) returns table(
    cat_id int,
    s_id text,
    id int,
    s_description text,
    poor_count bigint,
    satisfactory_count bigint,
    developing_count bigint,
    excellent_count bigint,
    poor_percent FLOAT,
    developing_percent FLOAT,
    satisfactory_percent FLOAT,
    excellent_percent FLOAT,
    total bigint
)
AS $$
#variable_conflict use_column
declare
f text[]; -- (select suboutcomes_cs from sem_req where term_id = term );
v text;
sub_id int;
reqs int[];
req int;
term int;
t_id int; -- (SELECT get_term_id(sem, ye));
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


select get_term_id from get_term_id(sem, ye) into term;
select reqs_id from term where term_id = get_term_id(sem, year) into t_id;
execute 'select array(select id from suboutcome_details_'|| (SELECT lower(degree)) ||' where reqs_id = '|| t_id ||' order by order_float)' into reqs;

begin
    foreach req in array reqs
    loop
    raise notice '%', req;
    end loop;
end;

drop table if exists curr;
create temporary table if not exists curr(
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

execute 'update curr set cat_id =
    (select '|| (SELECT lower(degree)) ||'_cat_id 
    from outcome_details_'|| (SELECT lower(degree)) ||' 
    where curr.cat_id = outcome_details_'|| (SELECT lower(degree)) ||'.id);';

for score in select s_id from curr
loop
execute 'select (select total from sub_grades('''|| score ||''', '''|| degree ||''', '|| term ||'))' into t;
execute 'select (select poor_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| term ||'))' into p;
execute 'select (select developing_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| term ||'))' into d;
execute 'select (select satisfactory_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| term ||'))' into s;
execute 'select (select excellent_count from sub_grades('''|| score ||''', '''|| degree ||''', '|| term ||'))' into e;
update curr set total = t where s_id = score;
update curr set poor_count = p where s_id = score;
update curr set developing_count = d where s_id = score;
update curr set satisfactory_count = s where s_id = score;
update curr set excellent_count = e where s_id = score;

end loop;
update curr set total = 1 where total = 0;
update curr set poor_count = 0 where poor_count is null;
update curr set developing_count = 0 where developing_count is null;
update curr set satisfactory_count = 0 where satisfactory_count is null;
update curr set excellent_count = 0 where excellent_count is null;
for score in select s_id from curr
loop
select (poor_count/total::float) from curr where s_id = score into pp;
-- -- raise notice '%', pp;
select (developing_count/total::float) from curr where s_id = score into dp;
-- -- raise notice '%', dp;
select (satisfactory_count/total::float) from curr where s_id = score into sp;
-- -- raise notice '%', sp;
select (excellent_count/total::float) from curr where s_id = score into ep;
---- raise notice '%', ep;

update curr set poor_percent = ROUND(pp::numeric * 100,2) where s_id = score;
update curr set developing_percent =  ROUND(dp::numeric * 100, 2) where s_id = score;
update curr set satisfactory_percent =  ROUND(sp::numeric * 100, 2) where s_id = score;
update curr set excellent_percent =  ROUND (ep::numeric * 100, 2) where s_id = score;


end loop;
return QUERY select * from curr;
end; $$ language plpgsql;
