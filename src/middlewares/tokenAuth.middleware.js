import passport from "passport";
import { MESSAGES, STATUS } from "../utils/constants.utils.js";
import CustomError from "../utils/customError.utils.js";

const tokenAuth = async (req, res, next) => {
  passport.authenticate('jwt', {
    failureMessage: true
  },
    async (error, user, info) => {
      try {
        if (error || !user) {
          throw new CustomError(
            STATUS.UNAUTHORIZE,
            MESSAGES.UNAUTHORIZE_TOKEN
          )
        }
        next()
      } catch (error) {
        next(error)
      }

    }
  )(req, res, next)
}

export default tokenAuth;