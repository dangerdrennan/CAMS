CREATE OR REPLACE FUNCTION set_current_term ()
RETURNS void as $$
DECLARE
y INTEGER;
m INTEGER;
BEGIN
SELECT date_part('year', now())::INT
   into
   y;
SELECT date_part('month', now())::INT
    into
    m;
if (m < 7) then
INSERT INTO term (semester, year)
    SELECT 'Spring', y
            WHERE
                NOT EXISTS (
                    SELECT * FROM term WHERE semester = 'Spring' AND year = y
                );
UPDATE term SET is_current = NULL;
UPDATE term SET is_current = true WHERE semester = 'Spring' AND year = y;
else
INSERT INTO term (semester, year)
    SELECT 'Fall', y
            WHERE
                NOT EXISTS (
                    SELECT * FROM term WHERE semester = 'Fall' AND year = y
                );
UPDATE term SET is_current = NULL;
UPDATE term SET is_current = true WHERE semester = 'Fall' AND year = y;
end if;
END; $$  LANGUAGE 'plpgsql';