var request = require('request');
var cheerio = require('cheerio');

var scrape = function(url, callback) {
	request(url, (error, response, html) => {
		if(!error) {
			var $ = cheerio.load(html);
			var title = $("title").text();
			var data = {url: url, name: title}
			callback(data);
		}
	})
}

var promiseScrape = function(url){
	return new Promise((resovle, reject) => {
		request(url, (error, response, html) => {
			//console.log(error,response)
			if(!error && response.statusCode !== 429) {				
				var $ = cheerio.load(html);
				var title = $("title").text();
				var data = {url: url, name: title}
				resovle(data);
			} if (response.statusCode === 429) {
				var data = {url: url, name: url}
				resovle(data);
			}else {
				reject(error);
			}
		})		
	})
}

module.exports.promiseScrape = promiseScrape;