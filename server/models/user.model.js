const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

Userschema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified) {
    return next();
  }
  try {
    const saltround = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltround);
    user.password = hashPassword;
    next()
  } catch (error) {
    next(error);
  }
});

const Usermodel = mongoose.model("user", Userschema);
module.exports = Usermodel;
