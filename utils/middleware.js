const auth = (req, res, next) => {
    const { admin } = req.headers;
    if (admin) {
        next()
    } else {
        res.json({ error: -1, description: `Ruta ${req.baseUrl} método => [${req.method}] no autorizada` })
    }
}
const invalidPathHandler = (req, res) => {
    res.json({ error: -2, description: `Ruta ${req.originalUrl} método => [${req.method}]  no implementado` });
}

module.exports = { auth, invalidPathHandler }