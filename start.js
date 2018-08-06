'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const sockets = [];

io.on('connection', function(socket){
  sockets.push(socket);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});



// const ClassNamerHtmlFetcher = require('./app/services/ClassNamerHtmlFetcher');
// const ClassNamerHtmlParser = require('./app/services/ClassNamerHtmlParser');
// const ClassNamerHtmlSplitter = require('./app/services/ClassNamerHtmlSplitter');

  
  // const classNamerHtmlFetcher = new ClassNamerHtmlFetcher();
  // const classNamerHtmlParser = new ClassNamerHtmlParser();
  // const classNamerHtmlSplitter = new ClassNamerHtmlSplitter();
  
  // let executables = [];
  
  // const doJob = async (i) => {
  //     const html = await classNamerHtmlFetcher.fetch();
  //     const parsed = classNamerHtmlParser.parse(html);
  //     const splitted = classNamerHtmlSplitter.split(parsed);
      
  //     return splitted;
  //   };
    
  // for (let i=0; i < 100; i++) {
  //   executables.push(doJob(i));
  // };
  
  // let results = await Promise.all(executables);
  
  // res.send(results);

// app.listen(3000, () => console.log('Example app listening on port 3000'));
