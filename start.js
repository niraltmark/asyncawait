'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const ClassNamerHtmlFetcher = require('./app/services/ClassNamerHtmlFetcher');
const ClassNamerHtmlParser = require('./app/services/ClassNamerHtmlParser');
const ClassNamerHtmlSplitter = require('./app/services/ClassNamerHtmlSplitter');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/views/index.html');
});

app.post('/start', async function(req, res) {
  const classNamerHtmlFetcher = new ClassNamerHtmlFetcher();
  const classNamerHtmlParser = new ClassNamerHtmlParser();
  const classNamerHtmlSplitter = new ClassNamerHtmlSplitter();
  
  let executables = [];
  
  const doJob = async (i) => {
      const html = await classNamerHtmlFetcher.fetch();
      const parsed = classNamerHtmlParser.parse(html);
      const splitted = classNamerHtmlSplitter.split(parsed);
      
      io.emit('chat message',  splitted);
      
      return splitted;
    };
    
  for (let i=0; i < 100; i++) {
    executables.push(doJob(i));
  };
  
  let results = await Promise.all(executables);
  
  res.send('done');
});

const sockets = [];

io.on('connection', function(socket){
  io.emit('chat message', 'hello everyone');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});