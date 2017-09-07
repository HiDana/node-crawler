var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

request(
  {
    url: "https://www.dcard.tw/f?latest=true",
    method: "GET"
  },
  function(e, r, b) {
    if (e || !b) {
      return;
    }
    var $ = cheerio.load(b);
    var result = [];
    var titles = $(
      "#root > div > div.App_main_38Mbt > div > div > main > div > div > div:nth-child(4) > div:nth-child(1) > div > div > a > article > div.PostEntry_content_g2afg > h3"
    );
    var response = $(
      "#root > div > div.App_main_38Mbt > div > div > main > div > div > div:nth-child(4) > div:nth-child(1) > div > div > a > article > div.PostEntry_content_g2afg > div.PostEntry_meta_1lGUF > span.PostEntry_comments_2iY8V"
    );

    for (var i = 0; i < titles.length; i++) {
      result.push({
        title: $(titles[i]).text(),
        res: $(response[i]).text()
      });
    }
    console.log(result);
    fs.writeFileSync("result.json", JSON.stringify(result));
  }
);
