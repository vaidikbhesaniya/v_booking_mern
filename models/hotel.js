import mongoose from "mongoose";

const hotelschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  type: {
    type: String,
    require: true,
  },

  city: {
    type: String,
    require: true,
  },

  address: {
    type: String,
    require: true,
  },

  distance: {
    type: String,
    require: true,
  },

  photos: {
    type: [String],
    // require: true,
  },

  title: {
    type: String,
  },
  desc: {
    type: String,
    require: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  rooms: {
    type: [String],
  },

  chepestprice: {
    type: Number,
  },

  featured: {
    type: Boolean,
  },

  imagegalary: {
    type: [
      {
        src: {
          type: String,
        },
      },
    ],
  },
});

export default mongoose.model("Hotel", hotelschema);
