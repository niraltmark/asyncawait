const cheerio = require('cheerio');

class ClassNamerHtmlParser {
    parse(html) {
        const $ = cheerio.load(html)
        
        return $("#classname").html();
    } 
}

module.exports = ClassNamerHtmlParser;
