let https = require('https')
let cheerio = require('cheerio')

function getData(callback) {
    https.get('https://github.com/trending', function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    });
}

getData(function(data) {
    if (data) {
        var $ = cheerio.load(data);
        let list = []
        $(".repo-list li").each(function(i, e) {
            let title = $(e).find('h3').text().trim();
            let desc = $(e).find('.py-1').text().trim();
            let lang = $($(e).find('.f6>span')[0]).text().trim();
            let star = $($(e).find('.f6>a')[0]).text().trim();
            let fork = $($(e).find('.f6>a')[1]).text().trim();
            let current = $($(e).find('.f6>span')[2]).text().trim();
            list.push({
              title: title,
              desc: desc,
              lang: lang,
              star: star,
              fork: fork,
              current: current,
            })
        });
        console.log(list)
    } else {
        console.log("error");
    }
});
