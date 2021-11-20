CREATE FUNCTION find_proj_id(p_name TEXT)
RETURNS integer AS $$
DECLARE id integer;
BEGIN
        SELECT proj_id INTO id
        FROM    project
        WHERE   title = $1
        LIMIT 1;

        RETURN id;
END;
$$  LANGUAGE plpgsql