import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";

dotenv.config();
app.use(cors());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (err) {
    throw err;
  }
};
app.use(express.static("public"));
app.use(morgan("default"));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);

app.use("/hotels", hotelRoute);

app.use("/rooms", roomsRoute);

// mongoose.connection.on("disconnected", () => {
//   console.log("mongodb disconnected");
// });
// mongoose.connection.on("connected", () => {
//   console.log("mongodb connected");
// });
app.listen(8000, () => {
  connect();
  console.log("connected to backend.");
});
