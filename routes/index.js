var express = require("express");
var router = express.Router();

var yamsPlayerController = require("../controller/yamsPlayerController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/save-grid", function (req, res, next) {
  yamsPlayerController.saveGrid(
    req.body.token,
    req.body.grid,
    req.body.gameName
  );
  res.json({ result: "ALL GOOD BOY" });
});

router.post("/get-player-grid", async function (req, res, next) {
  res.json(await yamsPlayerController.getPlayerGrid(req.body.token));
});

router.post("/create-grid", async function (req, res, next) {
  res.json(
    await yamsPlayerController.createGrid(req.body.token, req.body.playerNames)
  );
});

module.exports = router;
