// var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

var scrape = function (cb) {
    axios.get("https://www.npr.org").then(function (response) {
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".hp-item").each(function (i, element) {
            // Save an empty result object
            var results = {};

            results.title = $(element).find("h3.title").text();
            results.url = $(element).find("a").attr('href');
            results.description = $(element).find("p.teaser").text();

            console.log(results);

        });
    });
    cb(results);

    // request("http://www.nytimes.com", function(err, res, body){
    //     var $ = cheerio.load(body);
    //     var articles = [];

    //     $(".theme-summary").each(function(i, element){
    //         var head = $(this).children(".story-heading").text().trim();
    //         var sum = $(this).children(".summary").text().trim();

    //         if(head && sum){
    //             var headNeat = head.replace(/(\r\n|\n|\r|\t|\s)+/gm, " ").trim();
    //             var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s)+/gm, " ").trim();

    //             var dataToAdd = {
    //                 headline: headNeat,
    //                 summary: sumNeat
    //             };

    //             articles.push(dataToAdd);
    //         }
    //     });
    //     cb(articles);
    // });
};

module.exports = scrape;