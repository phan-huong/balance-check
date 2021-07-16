"use strict";

const app = require('./app'),
      mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/balance_check_test' : 'mongodb://localhost:27017/balance_check'),
      mongoose = require('mongoose'),
      db = require('./config/keys').mongoURI,
      http = require('http'),
      socketio = require('socket.io'),
      formatMessage = require('./utils/messages');

const server = http.createServer(app);
const io = socketio(server);

// to support promise chains
mongoose.Promise = global.Promise;

// configuring mongoose with Node.js to set up database connection
mongoose.connect(
  db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)
  .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
  .catch(error => console.log(error));

server.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});

// io = require("socket.io")(server);
// require("./controllers/chatController")(io);

const botName = 'Chatbot';

// runs when client connects
io.on('connection', socket => {
  console.log('New WS Connection...');

  // socket.emit('message', formatMessage(botName, 'Welcome to our chatbox!'));
  socket.emit('message', null);

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    // console.log(msg);
    io.emit('message', formatMessage('User', msg));
  })
});
