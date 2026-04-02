import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvheuoiodvvngknegecu.supabase.co';
const supabaseKey = 'sb_publishable_X9dGnBchmQkbiMvJtgn0Vw_pbWljlHj';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    // try to insert a fake record to see if we get a permission error on clients table
    const { data: clients, error } = await supabase.from('clients').insert([{ name: 'test', logourl: 'test' }]).select();
    if (error) {
        console.error("Error inserting clients:", error.message);
    } else {
        console.log("Inserted clients successfully:", clients);
        // clean it up
        await supabase.from('clients').delete().eq('id', clients[0].id);
    }
}
main();
