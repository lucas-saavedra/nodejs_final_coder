import { MESSAGES, STATUS } from "../utils/constants.utils.js";
import CustomError from "../utils/customError.utils.js";

const isAuth = async (req, res, next) => {

  try {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      throw new CustomError(
        STATUS.UNAUTHORIZE,
        MESSAGES.UNAUTHORIZE
      )
    }
  } catch (error) {
    next(error)
  }

};

export default isAuth;