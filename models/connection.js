var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://JeremyHoltzmann:TestTest@cluster0.xezpb.mongodb.net/yams?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);
