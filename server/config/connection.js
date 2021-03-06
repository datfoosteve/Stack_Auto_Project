const mongoose = require('mongoose');
// const encodeURIComponent = '%40smu%40smu%40';
// `mongodb+srv://dbUser:${encodeURIComponent}@cluster0.odgmd.mongodb.net/stack-autocomplete?retryWrites=true&w=majority`,

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/finalProjectDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
