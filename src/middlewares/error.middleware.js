import { MESSAGES, STATUS } from "../utils/constants.utils.js";
import CustomError from "../utils/customError.utils.js";


const errorResponder = (error, req, res, next) => {
  
  if (error.message.includes('Cast to ObjectId failed')) {
    error = new CustomError(STATUS.NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
  }
  const status = error.status || 500;
  const message = error.message.split('=>');
  const errorItem = {
    message: message[0],
    details: message[1]
  };

  const errorResponse = {
    error: true,
    status,
    error_details: errorItem
  };
  res.render('ejs/error.ejs', { error: errorResponse })
  res.end();
  //return res.status(status).json(errorResponse);

};

/* errorPageRender = (error, req, res) => {
  res.render('ejs/error.ejs', { error })
} */

export default errorResponder;