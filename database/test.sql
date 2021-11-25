create or replace function test(a new_sub[]) returns void
-- create or replace function post_reqs(outs int[]) returns void
AS $$
declare
o int;
ogg int;
sub json;
t text[];
tx text;
omgjson json := '[{ "type": false }, { "type": "photo" }, {"type": "comment" }]';
i json;
begin
-- t:= json_array_elements_text(s) limit 1;
-- raise notice '%', t[0];
--    foreach tx in ARRAY (select unnest(t)) 
--    loop
--    raise notice '%', tx;
--    end loop;

  FOR i IN SELECT * FROM json_array_elements(omgjson)
  LOOP
    RAISE NOTICE 'output from space %', i->>'type';
  END LOOP;

  FOR tx IN SELECT * FROM json_array_elements(omgjson)
  LOOP
    RAISE NOTICE 'output from space %', i->>'score_id';
  END LOOP;

    
    raise exception 'did it hit?';
end; $$ language plpgsql;

-- select test('[{"score_id":"test111111111111","outcome_cat_id":2, "suboutcome_name": "hello",
-- "poor_description": "hello" ,"developing_description": "hello",
-- "satisfactory_description": "hello", "excellent_description": "hello",
-- "order_float": 4.0}, 
-- {"score_id":"test222222222","outcome_cat_id":2, "suboutcome_name": "hello",
-- "poor_description": "hello", "developing_description": "hello",
-- "satisfactory_description": "hello", "excellent_description": "hello",
-- "order_float": 4.0}]');