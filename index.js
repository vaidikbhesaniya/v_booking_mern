import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";


app.use(cors());
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vaidik:YB7zqWjjzOmKogTt@cluster0.xa8kqvp.mongodb.net/myfirstdatabase?retryWrites=true&w=majority"
    );
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
