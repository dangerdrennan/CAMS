
CREATE OR REPLACE FUNCTION set_cap_prof(p_email TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE prof SET curr_cap_prof = null WHERE curr_cap_prof = true;
    UPDATE prof SET curr_cap_prof = true WHERE prof_email = p_email;
END;$$ LANGUAGE 'plpgsql';