import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvheuoiodvvngknegecu.supabase.co';
const supabaseKey = 'sb_publishable_X9dGnBchmQkbiMvJtgn0Vw_pbWljlHj';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data, error } = await supabase.from('settings').select('*').limit(1).single();
    if (error) console.error(error);
    console.log(JSON.stringify(data, null, 2));
}
main();
