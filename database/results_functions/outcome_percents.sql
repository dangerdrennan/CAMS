create or replace function get_outcome_percents(sem text, ye int, degree text) returns table(
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

select get_term_id from get_term_id(sem, ye) into term;
execute 'select suboutcomes_'|| (SELECT lower(degree)) ||' from sem_req where term_id = '|| term ||';' into f;
execute 'select outcome_cats_'|| (SELECT lower(degree)) ||' from sem_req where term_id = '|| term ||';' into g;

drop table if exists curr;
raise notice '%', term;
create temporary table if not exists curr(
    cat_id text,
    s_id text,
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
);

BEGIN
   FOREACH v IN array f
  Loop
  execute 'insert into curr(s_id) values (''' || v || ''');
        update curr set cat_id = (SELECT outcome_cat_id from suboutcome_details_'|| (SELECT lower(degree)) ||' where score_id = ''' || v || ''') where s_id = ''' || v || ''';
        update curr set s_description = (SELECT suboutcome_description from suboutcome_details_'|| (SELECT lower(degree)) ||' where score_id = ''' || v || ''') where s_id = ''' || v || ''';';
    END LOOP;
END;

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

for score in select s_id from curr
loop
select (poor_count/total::float) from curr where s_id = score into pp;
select (developing_count/total::float) from curr where s_id = score into dp;
select (satisfactory_count/total::float) from curr where s_id = score into sp;
select (excellent_count/total::float) from curr where s_id = score into ep;

drop TABLE if exists percents;
create temporary table if not exists percents(
    cat_id int,
    poor_percent FLOAT,
    developing_percent FLOAT,
    satisfactory_percent FLOAT,
    excellent_percent FLOAT
);

BEGIN
   FOREACH v IN array g
  Loop
  execute 'insert into percents(cat_id, poor_percent, developing_percent, satisfactory_percent, excellent_percent)
            values (' || v || ',
            (select ROUND(sum(poor_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| v ||'),
            (select ROUND(sum(developing_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| v ||'),
            (select ROUND(sum(satisfactory_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| v ||'),
            (select ROUND(sum(excellent_count) / sum(total)* 100, 2) from curr where cat_id::INT = '|| v ||'));';
    END LOOP;
    
END;
end loop;
return query
execute 'select outcome_details_'|| (SELECT lower(degree)) ||'.outcome_description, percents.* from percents left join outcome_details_'|| (SELECT lower(degree)) ||' on percents.cat_id = outcome_details_'|| (SELECT lower(degree)) ||'.'|| (SELECT lower(degree)) ||'_cat_id;';
end; $$ language plpgsql;