import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import { createerror } from "../utils/error.js";

export const createroom = async (req, res) => {
  const hotelid = req.params.hotelid;

  const newroom = new Room(req.body);

  try {
    const savedroom = await newroom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $push: { rooms: savedroom._id },
      });
      res.send("success");
    } catch (error) {
      res.send(error);
    }
  } catch (err) {
    res.send(err);
  }
};

export const updateroom = async (req, res) => {
  const updatedroom = await Room.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updatedroom);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getallroom = async (req, res, next) => {
  const room = await Room.find();
  try {
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
    // next(err);
  }
};

export const getroom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  try {
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteroom = async (req, res) => {
  const hotelid = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      res.send(error);
    }

    res.status(200).json({ massage: " success " });
  } catch (err) {
    res.status(500).json(err);
  }
};
