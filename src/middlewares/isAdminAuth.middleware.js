import { MESSAGES, STATUS } from "../utils/constants.utils.js";
import CustomError from "../utils/customError.utils.js";

const isAdminAuth = async (req, res, next) => {

  try {
    if (req.user?.admin) {
      next();
    }
    else {
      throw new CustomError(
        STATUS.UNAUTHORIZE,
        MESSAGES.UNAUTHORIZE_ADMIN
      )
    }
  } catch (error) {
    next(error)
  }

};

export default isAdminAuth;