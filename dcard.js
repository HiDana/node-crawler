var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

const url = "https://www.dcard.tw";
const uri = "/f/pet";

request(
  {
    url: url + uri,
    method: "GET"
  },
  function(e, r, b) {
    if (e || !b) {
      return;
    }
    var $ = cheerio.load(b);
    let result = [];
    var titles = $(".PostEntry_content_g2afg > h3");
    var response = $(".PostEntry_comments_2iY8V");
    var article_id = $(
      ".App_main_38Mbt > div > div > main > div > div > div:nth-child(4) > div:nth-child(1) > div > div > a"
    );

    for (var i = 0; i < titles.length; i++) {
      result.push({
        title: $(titles[i]).text(),
        res: $(response[i]).text(),
        id: url + $(article_id[i]).attr("href")
      });
    }
    console.log(result);
    fs.writeFileSync("result.json", JSON.stringify(result));
  }
);
