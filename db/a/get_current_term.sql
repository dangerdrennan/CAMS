CREATE FUNCTION get_current_term()
RETURNS integer AS $$
DECLARE current_term integer;
BEGIN
        SELECT term_id INTO current_term
        FROM    term
        WHERE   is_current = true
        LIMIT 1;

        RETURN current_term;
END;
$$  LANGUAGE plpgsql;