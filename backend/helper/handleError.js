class HandleError extends Error {
  constructor(message, statusCode) {
    super(message); //super = Error
    this.statusCode = statusCode;
    this.name = "HandleError";
    Error.captureStackTrace(this, HandleError);
  }
}

export default HandleError;
