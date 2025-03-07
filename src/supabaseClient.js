// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseServRoleKey) {
  throw new Error("Missing Supabase environment variables!");
}

const supabase = createClient(supabaseUrl, supabaseServRoleKey);
export default supabase;
