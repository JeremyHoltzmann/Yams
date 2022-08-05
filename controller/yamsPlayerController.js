var fetch = require("node-fetch");
var yamsPlayerModel = require("../models/yamsPlayer").yamsPlayerModel;

var yamsPlayerController = {
  saveGrid: async function (token, grids, gameName) {
    var player = await yamsPlayerModel.findOne({ playerId: grids.playerId });
    if (player)
      await yamsPlayerModel.findOneAndUpdate(
        { playerId: grids.player },
        { grids: grids.grids }
      );
    else {
      var newPlayer = new yamsPlayerModel({
        gameName: gameName,
        playerId: token,
        grids: grids.grids,
      });
      await newPlayer.save();
    }
  },
  getPlayerGrid: async function (token) {
    var grids = await yamsPlayerModel.find({ playerId: token });
    if (!grids) return { result: false };
    return { result: true, grids: grids };
  },
  createGrid: async function (token, playerNames) {
    console.log(
      "🚀 ~ file: yamsPlayerController.js ~ line 28 ~ playerNames",
      playerNames
    );

    var playerArray = JSON.parse(playerNames);
    var newPlayer = new yamsPlayerModel({
      playerId: token,
      grids: Array(playerArray.length),
    });
    for (let i = 0; i < newPlayer.grids.length; i++) {
      newPlayer.grids[i].name = playerNames[i];
    }
    var player = await newPlayer.save();
    if (!player) return { result: false };
    return { result: true, player: player };
  },
};

module.exports = yamsPlayerController;
