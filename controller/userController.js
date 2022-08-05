var bcrypt = require("bcrypt");
var uid2 = require("uid2");
const UserModel = require("../models/user");

const CRYPTTURN = 10;

const userController = {
  addUser: async function (userName, email, password) {
    console.log("🚀 ~ file: userController.js ~ line 9 ~ password", password);
    var user = await UserModel.findOne({
      $or: [{ userName: userName }, { email: email }],
    });
    if (user) return { result: false, message: "User Already existing" };

    var newUser = new UserModel({
      userName: userName,
      email: email,
      password: bcrypt.hashSync(password, CRYPTTURN),
      token: uid2(32),
    });
    await newUser.save();
    return { result: true, message: "Ok" };
  },

  signIn: async (email, password) => {
    var user = await UserModel.findOne({ email: email });

    if (!user) return { result: false, message: "Wrong email or password 1" };

    if (bcrypt.compareSync(password, user.password)) {
      return { result: true, message: "Ok", data: { user } };
    } else {
      return { result: false, message: "Wrong email or password 2" };
    }
  },
};

module.exports = userController;
