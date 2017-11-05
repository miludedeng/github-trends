let https = require('https')
let cheerio = require('cheerio')

function getData(lang, since) {
    if (!since) {
        since = 'today'
    }
    return new Promise(function(resolve, reject) {
        https.get('https://github.com/trending' + (lang != 'all' ? '/' + lang : '') + '?since=' + since, function(res) {
            var data = "";
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on("end", function() {
                resolve(data);
            });
        }).on("error", function() {
            reject(null);
        });
    });
}

exports.getData = async(ctx, next) => {
    let lang = ctx.params.lang;
    let since = ctx.query.since;
    await getData(lang, since).then(data => {
        var $ = cheerio.load(data);
        let list = []
        $(".repo-list li").each(function(i, e) {
            let title = $(e).find('h3').text().trim();
            let desc = $(e).find('.py-1').text().trim();
            let lang = $($(e).find('.f6>span')[0]).text().trim();
            let star = $($(e).find('.f6>a')[0]).text().trim();
            let fork = $($(e).find('.f6>a')[1]).text().trim();
            let current = $(e).find('.f6>.float-sm-right').text().trim();
            if(lang==='Built by'){
              lang = '';
            }
            list.push({
                title: title,
                desc: desc,
                lang: lang,
                star: star,
                fork: fork,
                current: current,
            })
        });
        ctx.body = list;
    });
}
