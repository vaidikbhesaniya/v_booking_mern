import jwt from "jsonwebtoken";
import { createerror } from "./error.js";

export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // return next(createerror(401, "you are not authenticated"));

    return res.send("you are not authenticated");
  }

  jwt.verify(token, "vaidik", (err, user) => {
    if (err) {
      return res.send({ ...err, condition: "taken is not exist" });
    }
    req.user = user;
    next();
  });
};

export const verifyuser = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.send("you can not delete others accout");
    }
  });
};

export const verifyadmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.send("you can not delete others accout");
    }
  });
};
