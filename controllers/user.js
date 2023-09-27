import User from "../models/user.js";

export const creteuser = async (req, res) => {
  const newuser = new User(req.body);
  try {
    const saveuser = await newuser.save();

    res.status(200).json(saveuser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateuser = async (req, res) => {
  const updateduser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updateduser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getalluser = async (req, res, next) => {
  const user = await User.find();
  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    // next(err);
  }
};

export const getuser = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteuser = async (req, res) => {
  const deleteuser = await User.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({ massage: " success " });
  } catch (err) {
    res.status(500).json(err);
  }
};
