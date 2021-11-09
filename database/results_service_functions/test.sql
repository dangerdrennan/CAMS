CREATE OR REPLACE FUNCTION tbl()  -- return well known table
  RETURNS SETOF t AS
$func$
BEGIN
   RETURN QUERY
   TABLE assessment;
   SELECT * FROM assessment;  -- equivalent
END
$func$  LANGUAGE plpgsql;