import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvheuoiodvvngknegecu.supabase.co';
const supabaseKey = 'sb_publishable_X9dGnBchmQkbiMvJtgn0Vw_pbWljlHj';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data: partners, error } = await supabase.from('partners').select('*');
    if (error) {
        console.error("Error fetching partners:", error.message);
    } else {
        console.log("Partners in DB:", partners);
    }
}
main();
