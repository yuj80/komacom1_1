const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    // Log JS console
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR (Uncaught Exception):', error.message));
    page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure()?.errorText));

    console.log("Navigating to http://www.komacom.co.kr/new/ ...");
    try {
        await page.goto('http://www.komacom.co.kr/new/', { waitUntil: 'networkidle0', timeout: 30000 });
        console.log("Page loaded. Taking a look at the HTML content...");
        const html = await page.content();
        console.log("HTML starts with:", html.substring(0, 200).replace(/\n/g, ' '));
        
        // Wait 2 extra seconds to see if any delayed errors pop up
        await new Promise(r => setTimeout(r, 2000));
        
    } catch (err) {
        console.error("Puppeteer Script Error:", err.message);
    } finally {
        await browser.close();
        console.log("Done.");
    }
})();
