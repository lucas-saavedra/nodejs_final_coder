const jwtCookieExtractor = (req) => {
    let token = null;
    if (req.user && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
};

export default jwtCookieExtractor