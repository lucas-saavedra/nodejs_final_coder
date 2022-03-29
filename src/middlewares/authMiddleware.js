const auth = (req, res, next) => {
    const { admin } = req.headers;
    if (admin) {
        next()
    } else {
        res.json({ error: -1, description: `Ruta ${req.baseUrl} método => [${req.method}] no autorizada` })
    }
}
export default auth;