import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

//requireSignIn
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    ); 
    req.user = decode; 
    next(); 
  } catch (error) {
    //console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access, not an admin",
      });
    } else {
      next();
    }
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in isAdmin middleware",
    });
  }
};
