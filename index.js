var path = require('path');


var express = require('express');
var app = express();
const server = require('http').Server(app);


require('./socket/socketio')(server);


const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/views/index.html");
});


var port = 4500;
server.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})

process
  .on('unhandledRejection', function onError(err) {
    console.log(`An unhandled rejection of promose, more details in error log.`);
    console.log(`Unhandled Rejection at Promise with error: ${err} Stacktrace: ${err.stack}`);
  })
  .on('uncaughtException', err => {
    console.log(`An uncaught Exception thrown, more details in error log.`);
    console.log(`Uncaught Exception thrown: ${err} Stacktrace: ${err.stack}`);
    process.exit(1);
  });

