import { MESSAGES, STATUS } from "../utils/constants/api.constants.js";
import CustomError from "../utils/errors/CustomError.js";

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