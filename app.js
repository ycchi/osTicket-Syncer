const puppeteer = require('puppeteer');
require('dotenv').config();



const runner = async () => {

    // Initiate the Puppeteer browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Go to the OS Ticket page and wait for it to load
    await page.goto(process.env.URL, { waitUntil: 'networkidle0'});

    // Provide Login credential 
    await page.type('input[id="name"]', process.env.USERNAME);
    await page.type('input[id="pass"]', process.env.PASSWORD);

    // Click and wait for navigation
    await Promise.all([
        page.click('button[class="submit button pull-right"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0'})
    ])

    
    console.log(`new page url: ${page.url()}`);
    
    // open search pop-up
    // await page.type('input.basic-search', 'PPMS');
    // await Promise.all([
    //     page.click('button[class="attached button"]'),
    //     page.waitForNavigation({ waitUntil: 'networkidle0'})
    // ])

    // advanced search and load saved searches
    await page.click('form > a');
    await page.waitForSelector('dt[class="saved-search"]');
    await page.click('a[class="load-search"]');
    await page.waitForSelector('dt[class="saved-search active"]');

    await page.click('dd > span > button')
    await page.click('button[id="do_search"]')

}

runner()