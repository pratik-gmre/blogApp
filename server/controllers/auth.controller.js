const Usermodel = require("../models/user.model.js");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const Userexist = await Usermodel.findOne({ username });
    if (Userexist) {
      return res.status(409).json({ msg: "Username already exists" });
    }

    const Emailexist = await Usermodel.findOne({ email });
    if (Emailexist) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const newUser = await Usermodel.create({ username, email, password });
    await newUser.save();
    res.status(200).json({ msg: "New user is created" });
  } catch (error) {
    next(error)
  }
};

module.exports = { signup: signup };
