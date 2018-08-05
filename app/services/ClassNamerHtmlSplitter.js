class ClassNamerHtmlSplitter {
    split(html) {
        return html.split('<wbr>');
    } 
}

module.exports = ClassNamerHtmlSplitter;
