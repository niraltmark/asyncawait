'use strict';

const express = require('express');
const app = express();
const https = require("https");

const ClassNamerHtmlFetcher = require('./app/services/ClassNamerHtmlFetcher');
const ClassNamerHtmlParser = require('./app/services/ClassNamerHtmlParser');
const ClassNamerHtmlSplitter = require('./app/services/ClassNamerHtmlSplitter');

app.get('/', async (req, res) => {
  const classNamerHtmlFetcher = new ClassNamerHtmlFetcher();
  const classNamerHtmlParser = new ClassNamerHtmlParser();
  const classNamerHtmlSplitter = new ClassNamerHtmlSplitter();
  
  let executables = [];
  
  const doJob = async (i) => {
      const html = await classNamerHtmlFetcher.fetch();
      const parsed = classNamerHtmlParser.parse(html);
      const splitted = classNamerHtmlSplitter.split(parsed);
      
      return splitted;
    };
    
    let e = Array.from(new Array(100), (val, index) => index);

    console.log(e);
    
  for (let i=0; i < 100; i++) {
    executables.push(doJob(i));
  };
  
  let results = await Promise.all(executables);
  
  res.send(results);
});

app.listen(3000, () => console.log('Example app listening on port 3000'));
