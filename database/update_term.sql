CREATE OR REPLACE FUNCTION set_term (s TEXT, y INTEGER)
RETURNS void as $$
BEGIN
INSERT INTO term (semester, year) 
            SELECT s, y 
            WHERE
                NOT EXISTS (
                    SELECT * FROM term WHERE semester = s AND year = y
                );
UPDATE term SET is_current = NULL;
UPDATE term SET is_current = true WHERE semester = s AND year = y;
END; $$  LANGUAGE 'plpgsql';