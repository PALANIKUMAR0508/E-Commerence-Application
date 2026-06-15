import HandleError from "../helper/handleError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //Ethula irukura statuscode & message rendum handleError file la irukum
  err.message = err.message || "Internal Server Error";

  //Duplicate Key error => username or email already exists
  if (err.code === 11000) { //monga DB la irukura duplicate key error code 11000 ah irukum
    //console.log(err.keyValue);
    //console.log(Object.keys(err.keyValue));
    const message = `This ${Object.keys(err.keyValue)} already exists`;
    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({
    //Send to user
    success: false,
    message: err.message,
  });
};
