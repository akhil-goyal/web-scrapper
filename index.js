const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');

(async () => {

    const res = await fetch(`https://explodingtopics.com/featured-topics-this-month`);
    const text = await res.text();
    const $ = cheerio.load(text);

    const containers = $('.topicInfoContainer').toArray();
    const trends = containers.map(c => {

        const active = $(c);

        const keyword = active.find('.tileKeyword').text();
        const description = active.find('.tileDescription').text();
        const searchesPerMonth = active.find('.scoreTag').first().text().split('mo')[1];

        return { keyword, description, searchesPerMonth }
    });

    console.log({trends});

    const sheet = new Sheet();

    await sheet.load();

    sheet.addRows(trends);

})();