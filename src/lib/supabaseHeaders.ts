import { supabase } from "@/integrations/supabase/client";

/**
 * Sets the x-session-id header on the Supabase client for guest cart RLS policies.
 * Must be called early in the app lifecycle.
 */
export function initSessionHeader() {
  let sid = localStorage.getItem("cart_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("cart_session_id", sid);
  }

  // Set global headers on the Supabase REST client
  (supabase as any).rest.headers["x-session-id"] = sid;
  // Also set on the main client headers for other calls
  (supabase as any).headers["x-session-id"] = sid;

  return sid;
}
