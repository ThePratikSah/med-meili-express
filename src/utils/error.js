/**
 * To use this error class,
 *
 * const error = new ErrorWithCode("Not Authorized", 401);
 * return next(error);
 */
export class ErrorWithCode extends Error {
  status;

  constructor(message, status) {
    super(message); // Pass the message property to the Error constructor

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // This line is needed to make the 'instanceof' operator work when typescript compiles to native javascript
    Object.setPrototypeOf(this, ErrorWithCode.prototype);

    // Save the status property
    this.status = status || 500;
  }
}
