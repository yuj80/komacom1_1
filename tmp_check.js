import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bvheuoiodvvngknegecu.supabase.co";
const supabaseAnonKey = "sb_publishable_X9dGnBchmQkbiMvJtgn0Vw_pbWljlHj";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPortfolio() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .or('category.eq.ETC,category.eq.TV,category.eq.Digital');

  if (error) {
    console.error("Error fetching portfolio:", error);
    return;
  }

  console.log("Portfolio Items (ETC, TV, Digital):");
  data.forEach(item => {
    console.log(`- ID: ${item.id}, Title: ${item.title}, Category: ${item.category}`);
    console.log(`  URL: ${item.url}`);
    console.log(`  Thumbnail: ${item.thumbnail}`);
    console.log(`  Type: ${item.type}`);
    console.log('---');
  });
}

checkPortfolio();
