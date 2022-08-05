var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-up", async function (req, res, next) {
  console.log("SIGN UP : ", req.body);
  var message = await userController.addUser(
    req.body.userName,
    req.body.email,
    req.body.password
  );
  res.json(message);
});

router.post("/sign-in", async function (req, res, next) {
  var message = await userController.signIn(req.body.email, req.body.password);
  res.json(message);
});

module.exports = router;
