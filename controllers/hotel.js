import Hotel from "../models/hotel.js";

export const cretehotel = async (req, res) => {
  const newhotel = new Hotel(req.body);
  try {
    const savehotel = await newhotel.save();

    res.status(200).json(savehotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatehotel = async (req, res) => {
  const updatedhotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updatedhotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getallhotel = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      chepestprice: { $gt: min || 1, $lt: max || 999 },
    });
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
    // next(err);
  }
};

export const gethotel = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  try {
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const countBycity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const countBytype = async (req, res) => {
  try {
    const hotelcount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentcount = await Hotel.countDocuments({ type: "apartment" });
    const resortcount = await Hotel.countDocuments({ type: "resort" });
    const villacount = await Hotel.countDocuments({ type: "villa" });
    const cabincount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelcount },
      { type: "apartment", count: apartmentcount },
      { type: "resort", count: resortcount },
      { type: "villa", count: villacount },
      { type: "cabin", count: cabincount },
    ]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletehotel = async (req, res) => {
  const deletehotel = await Hotel.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({ massage: " success " });
  } catch (err) {
    res.status(500).json(err);
  }
};
