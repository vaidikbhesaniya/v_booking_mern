// import { User } from "../models/user";
// import { decrypt } from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newuser.save();
    res.status(201).send("user has been created");
  } catch (err) {
    res.status(401).send("username has been tacken");
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.send("account not found");
    }

    const ispasswordcorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!ispasswordcorrect) {
      return res.send("please enter orrect password");
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "vaidik");

    const { password, isAdmin, ...otherdetail } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .json({ ...otherdetail });
  } catch (err) {
    res.status(401).send("username has been tacken");
  }
};
