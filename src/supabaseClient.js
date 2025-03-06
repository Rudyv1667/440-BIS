// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseServRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServRoleKey) {
  throw new Error("Missing Supabase environment variables!");
}

const supabase = createClient(supabaseUrl, supabaseServRoleKey);
export default supabase;