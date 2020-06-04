const request = require(`request`);
const cheerio = require(`cheerio`);
const url = `https://www.fool.com/quote/nasdaq/microsoft/msft/`;

request(url, function(error, response, html) {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const price = $(`.current-price`);
    const firstArticleHead = $(`.text`);
    const firstArticleLink = $(`.text > h4 > a`).attr(`href`);

    console.log(firstArticleHead.text());
    console.log(firstArticleLink);
  }
  else{
    console.log('Error: ' + error);
  }
})