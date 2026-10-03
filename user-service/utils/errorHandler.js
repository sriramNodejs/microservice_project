const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    
    // Captures the stack trace excluding this constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}


module.exports = {
    catchAsync,
    AppError
}