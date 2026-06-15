import HandleError from "../helper/handleError.js";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
//Middleware to verify user authentication using JWT token from cookies
export const verifyUser = async (req, res, next) => {
  const { token } = req.cookies; //cookie parser use panni cookie la irukura token va destructure panni eduthutu irukkom
  //console.log(token);
  if (!token) {
    return next(
      new HandleError(
        "Access denied. Please login to access this resource",
        401,
      ),
    );
  }
  //Token verify panni decoded data va eduthutu irukkom 
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
 // console.log(decodedData);
  req.user = await user.findById(decodedData.id); //user model la irukura id use panni user details va req.user la store panni irukkom
  //console.log(req.user);
  next();
};

//["admin","superadmin"]
// ["user"]
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role - ${req.user.role} is not allowed to access this resource`,
          403,
        ),
      );
    }
    next();
  };
};
