"use strict";

const app = require('./app'),
      mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/balance_check_test' : 'mongodb://localhost:27017/balance_check'),
      mongoose = require('mongoose'),
      // db = mongoose.connection;
      db = require('./config/keys').mongoURI;

// to support promise chains
mongoose.Promise = global.Promise;

// configuring mongoose with Node.js to set up database connection
// mongoose.connect(
//   mongodbURI,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// configuring mongoose to connect with database
mongoose.connect(db, {
  useNewUrlParser: true, 
  // useCreateIndex: true, 
  useUnifiedTopology: true, 
  // useFindAndModify: false
  })
  .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
  .catch(err => console.log(err));

// db.on('error', console.error.bind(console, 'connection error:'));

// // log a message when the database is connected in main.js
// db.once("open", () => {
//   console.log("Successfully connected to MongoDB using Mongoose!");
// });

// app.listen(app.get("port"), () => {
//   console.log(`Server running at http://localhost:${app.get("port")}`);
// });

app.listen(app.get("port"), () => {
  console.log(`Server running at Port: ${app.get("port")}`);
});
