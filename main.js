"use strict";

const app = require('./app'),
      mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/balance_check_test' : 'mongodb://localhost:27017/balance_check'),
      mongoose = require('mongoose'),
      db = require('./config/keys').mongoURI;

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

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
