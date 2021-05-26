require('dotenv').config();
var TASK = require('./routes/tasksroute');
const USER = require('./routes/userroute');
var Auth = require('./middleware/authToken')
var express = require('express');
var cors = require('cors');
var path = require('path');
const cookies = require("cookie-parser");
var socket = require('socket.io');
const http = require("http");
const DAO = require('./includes/db');

DAO.connect();

var app = express();

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
   })
)

app.use(express.static('../public'));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(cookies());

const server = http.createServer(app);

server.listen(3228, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});

var io = socket(server, {
   cors: {
      origin: 'http://localhost:3000',
      credentials: true
   }
});

io.on('connection', socket => {
   socket.use((packet, next) => {
      Auth.checkTokenSocket(socket, packet, next);
   });
   console.log('connected');

   socket.on('error', err => {
      socket.emit('auth_error', {statusCode : err.statusCode, message : 'Unathorized'} );
    })
   TASK.TASK_LISTENERS(socket);
   USER.ACCOUNT_LISTENERS(socket);
   socket.on("disconnect", () => console.log("disconnected"));
})