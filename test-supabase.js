import { createClient } from '@supabase/supabase-js';

try {
  const supabase = createClient("https://bvheuoiodvvngknegecu.supabase.co", "sb_publishable_X9dGnBchmQkbiMvJtgn0Vw_pbWljlHj");
  console.log("Client created successfully.");
} catch (e) {
  console.error("Error creating client:", e);
}
