-- ── Dhyaan waitlist (dhyaanapp.wisdomquotes.in) ─────────────────────────────
-- One row per email. Every sign-up gets a 6-character referral code; each friend
-- who joins with that code moves the referrer up 10 places. Emails are PII, so the
-- table is closed to anon/authenticated: the site only reaches it through the two
-- SECURITY DEFINER functions below, which never return an email.

CREATE TABLE IF NOT EXISTS public.dhyaan_waitlist (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email        TEXT        NOT NULL,
    ref_code     TEXT        NOT NULL UNIQUE,
    referred_by  TEXT,
    source       TEXT,
    country      TEXT,
    devices      TEXT[]      NOT NULL DEFAULT '{}',
    practice     TEXT,
    utm          JSONB       NOT NULL DEFAULT '{}'::jsonb,
    user_agent   TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS dhyaan_waitlist_email_key ON public.dhyaan_waitlist (lower(email));
CREATE INDEX IF NOT EXISTS dhyaan_waitlist_referred_by_idx ON public.dhyaan_waitlist (referred_by);

ALTER TABLE public.dhyaan_waitlist ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.dhyaan_waitlist FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.dhyaan_waitlist_spot(p_id BIGINT, p_code TEXT)
RETURNS TABLE (spot INT, referrals INT, total INT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    WITH r AS (SELECT count(*)::int AS n FROM dhyaan_waitlist WHERE referred_by = p_code),
         b AS (SELECT count(*)::int AS n FROM dhyaan_waitlist WHERE id <= p_id),
         t AS (SELECT count(*)::int AS n FROM dhyaan_waitlist)
    SELECT GREATEST(1, b.n - 10 * r.n), r.n, t.n FROM r, b, t;
$$;

CREATE OR REPLACE FUNCTION public.dhyaan_waitlist_join(
    p_email    TEXT,
    p_ref      TEXT    DEFAULT NULL,
    p_source   TEXT    DEFAULT NULL,
    p_country  TEXT    DEFAULT NULL,
    p_devices  TEXT[]  DEFAULT '{}',
    p_practice TEXT    DEFAULT NULL,
    p_utm      JSONB   DEFAULT '{}'::jsonb,
    p_ua       TEXT    DEFAULT NULL
)
RETURNS TABLE (ref_code TEXT, spot INT, referrals INT, total INT, is_new BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    v_email TEXT := lower(trim(coalesce(p_email, '')));
    v_ref   TEXT := nullif(upper(trim(coalesce(p_ref, ''))), '');
    v_id    BIGINT;
    v_code  TEXT;
    v_new   BOOLEAN := FALSE;
BEGIN
    IF length(v_email) > 254 OR v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' THEN
        RAISE EXCEPTION 'invalid_email' USING ERRCODE = '22023';
    END IF;

    SELECT w.id, w.ref_code INTO v_id, v_code FROM dhyaan_waitlist w WHERE lower(w.email) = v_email;

    IF v_id IS NULL THEN
        IF v_ref IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dhyaan_waitlist w WHERE w.ref_code = v_ref) THEN
            v_ref := NULL;
        END IF;
        LOOP
            v_code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
            EXIT WHEN NOT EXISTS (SELECT 1 FROM dhyaan_waitlist w WHERE w.ref_code = v_code);
        END LOOP;
        BEGIN
            INSERT INTO dhyaan_waitlist (email, ref_code, referred_by, source, country, devices, practice, utm, user_agent)
            VALUES (v_email, v_code, v_ref, left(p_source, 80), left(p_country, 8),
                    coalesce(p_devices[1:5], '{}'), left(p_practice, 40), coalesce(p_utm, '{}'::jsonb), left(p_ua, 300))
            RETURNING id INTO v_id;
            v_new := TRUE;
        EXCEPTION WHEN unique_violation THEN
            SELECT w.id, w.ref_code INTO v_id, v_code FROM dhyaan_waitlist w WHERE lower(w.email) = v_email;
        END;
    END IF;

    RETURN QUERY SELECT v_code, s.spot, s.referrals, s.total, v_new FROM dhyaan_waitlist_spot(v_id, v_code) s;
END;
$$;

-- Look up a spot by referral code (the code is the only handle the browser keeps).
CREATE OR REPLACE FUNCTION public.dhyaan_waitlist_status(p_code TEXT)
RETURNS TABLE (ref_code TEXT, spot INT, referrals INT, total INT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT w.ref_code, s.spot, s.referrals, s.total
    FROM dhyaan_waitlist w, LATERAL dhyaan_waitlist_spot(w.id, w.ref_code) s
    WHERE w.ref_code = upper(trim(p_code));
$$;

REVOKE ALL ON FUNCTION public.dhyaan_waitlist_spot(BIGINT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.dhyaan_waitlist_join(TEXT, TEXT, TEXT, TEXT, TEXT[], TEXT, JSONB, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.dhyaan_waitlist_status(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dhyaan_waitlist_join(TEXT, TEXT, TEXT, TEXT, TEXT[], TEXT, JSONB, TEXT) TO anon, service_role;
GRANT EXECUTE ON FUNCTION public.dhyaan_waitlist_status(TEXT) TO anon, service_role;
