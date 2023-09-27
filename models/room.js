import mongoose from "mongoose";

const roomschema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: String,
      require: true,
      unique: true,
    },
    maxpeople: {
      type: Number,
      require: true,
    },

    desc: {
      type: String,
      required: true,
    },

    roomnumbers: [{ number: Number, unavailabledates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomschema);
