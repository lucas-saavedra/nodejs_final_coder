import jwt from 'jsonwebtoken';
import config from '../../env.config.js';
import UsersApi from '../api/users.api.js';
const User = new UsersApi();
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
const userExtractor = async (req, res, next) => {
    let token = null;
    token = getTokenFrom(req);
    let decodedToken = '';
    try {
        decodedToken = jwt.verify(token, config.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid' })
        }
        const user = await User.getByIdApi(decodedToken.id);
        req.userId = user._id;
        next();
    } catch (error) {
        res.json(error)
    }

}
export default userExtractor;
