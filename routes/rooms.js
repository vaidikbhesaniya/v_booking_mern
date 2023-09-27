import express from "express";
import {
  createroom,
  getallroom,
  getroom,
  updateroom,
  deleteroom,
} from "../controllers/room.js";
import { verifyadmin, verifyuser } from "../utils/verifytokens.js";
const router = express.Router();

router.post("/:hotelid", createroom);
//get all user
router.get("/", verifyadmin, getallroom);

//get perticular user
router.get("/:id", verifyuser, getroom);
//update
router.put("/:id", verifyuser, updateroom);

//delete
router.delete("/:id/:hotelid", verifyuser, deleteroom);
export default router;
