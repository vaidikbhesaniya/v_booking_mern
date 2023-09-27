import { Router } from "express";
import express from "express";

import {
  creteuser,
  getalluser,
  getuser,
  deleteuser,
  updateuser,
} from "../controllers/user.js";
import { verifyadmin, verifytoken, verifyuser } from "../utils/verifytokens.js";

const router = Router();
//crete user

router.get("/checkauthentication", verifytoken, (req, res, next) => {
  res.send("hello user you are authenticated");
});

router.get("/checkuser/:id", verifyuser, (req, res, next) => {
  res.send("hello use you are logged in and you can delete your acout");
});

router.get("/checkadmin/:id", verifyadmin, (req, res, next) => {
  res.send("hello admin you are logged in and you can delete your account...");
});
router.post("/", creteuser);
//get all user
router.get("/", verifyadmin, getalluser);

//get perticular user
router.get("/:id", verifyuser, getuser);
//update
router.put("/:id", verifyuser, updateuser);

//delete
router.delete("/:id", verifyuser, deleteuser);
export default router;
