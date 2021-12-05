CREATE OR REPLACE FUNCTION set_current_term ()
RETURNS void as $$
DECLARE
y INTEGER;
m INTEGER;
req INTEGER;
BEGIN
SELECT greatest(reqs_id) from term
    into
    req;
SELECT date_part('year', now())::INT
   into
   y;
SELECT date_part('month', now())::INT
    into
    m;
if (m < 7) then
INSERT INTO term (reqs_id, semester, year)
    SELECT req, 'Spring', y
            WHERE
                NOT EXISTS (
                    SELECT * FROM term WHERE semester = 'Spring' AND year = y
                );
UPDATE term SET is_current = NULL;
UPDATE term SET is_current = true WHERE semester = 'Spring' AND year = y;
else
INSERT INTO term (reqs_id, semester, year)
    SELECT req, 'Fall', y
            WHERE
                NOT EXISTS (
                    SELECT * FROM term WHERE semester = 'Fall' AND year = y
                );
UPDATE term SET is_current = NULL;
UPDATE term SET is_current = true WHERE semester = 'Fall' AND year = y;
end if;
END; $$  LANGUAGE 'plpgsql';