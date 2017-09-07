var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require("mkdirp");
var async = require("async");

var data = require("./result.json");

for (var j = 0; j < data.length; j++) {
  var url = data[j].id.substr(0, 38);
  console.log(url);
  // var url = "https://www.dcard.tw/f/photography/p/227177223";

  var dir = "./images";

  var links = [];

  mkdirp(dir, function(err) {
    if (err) {
      console.log(err);
    }
  });

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $(".Post_content_NKEl9 > div > div > div > img").each(function() {
        var src = $(this).attr("src");

        src = src.replace(/t_s208x130c5/, "t_s960x600c5");
        links.push(src);
      });
      // 每次執行一次異步
      async.mapSeries(
        links,
        function(item, callback) {
          download(
            item,
            dir,
            Math.floor(Math.random() * 100000) + item.substr(-4, 6)
          );
          callback(null, item);
        },
        function(err, results) {}
      );
    }
  });

  var download = function(url, dir, filename) {
    console.log("img", url);
    request.head(url, function(err, res, body) {
      request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
  };
}
