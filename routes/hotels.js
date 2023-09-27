import { Router } from "express";
import express from "express";

import {
  cretehotel,
  getallhotel,
  gethotel,
  deletehotel,
  updatehotel,
  countBycity,
  countBytype,
} from "../controllers/hotel.js";
import { verifyadmin } from "../utils/verifytokens.js";

const router = Router();
//crete hotel
router.post("/", verifyadmin, cretehotel);
//get all hotel
router.get("/", getallhotel);

//get perticular hotel
router.get("/find/:id", gethotel);

router.get("/countBycity", countBycity);
router.get("/countBytype", countBytype);

//update

router.put("/find/:id", verifyadmin, updatehotel);

//delete
router.delete("/find/:id", verifyadmin, deletehotel);
export default router;
