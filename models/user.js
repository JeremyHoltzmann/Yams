var mongoose = require("mongoose");
// var citySchema = require("./cityModel");

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  token: String,
  //   cities: [
  //     {
  //       type: mongoose.Types.ObjectId,
  //       ref: "games",
  //     },
  //   ],
});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
