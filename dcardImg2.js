var request = require("request");
var fs = require("fs");
var http = require("http");
var cheerio = require("cheerio");

const url = "https://www.dcard.tw";
const uri = "/f/photography/p/227177223";

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
    var titles = $(".Post_meta_MVFsO > h1");
    var images = $(".Post_content_NKEl9 > div > div > div > img");
    console.log($(titles).text());

    images.each(function() {
      var src = $(this).attr("src");
      src = src.replace(/t_s208x130c5/, "t_s960x600c5");
      result.push(src);
    });

    // console.log(result);
    let imgUrl = result[1];
    imgUrl = imgUrl.replace(/'/g, '"');
    const dir = "./download";
    console.log(imgUrl);

    var file = fs.createWriteStream("test.jpg");
    var request = http.get(
      "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg",
      function(response) {
        response.pipe(file);
      }
    );
  }
);
