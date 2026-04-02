import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvheuoiodvvngknegecu.supabase.co';
const supabaseKey = 'sb_publishable_X9dGnBchmQkbiMvJtgn0Vw_pbWljlHj';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    // try to insert a fake record to see if we get a permission error
    const { data: partners, error } = await supabase.from('partners').insert([{ name: 'test', logourl: 'test' }]).select();
    if (error) {
        console.error("Error inserting partners:", error.message);
    } else {
        console.log("Inserted partners successfully:", partners);
        // clean it up
        await supabase.from('partners').delete().eq('id', partners[0].id);
    }
}
main();
