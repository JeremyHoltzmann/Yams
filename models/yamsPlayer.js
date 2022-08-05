var mongoose = require("mongoose");
var { gridSchema } = require("./gridSchema");

const yamsPlayerSchema = mongoose.Schema({
  gameName: String,
  playerId: String,
  playerName: String,
  grids: [gridSchema],
});

var yamsPlayerModel = mongoose.model("yamsPlayer", yamsPlayerSchema);

module.exports.yamsPlayerModel = yamsPlayerModel;
module.exports.yamsPlayerSchema = yamsPlayerSchema;
