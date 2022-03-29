const invalidPathHandler = (req, res) => {
    res.json({ error: -2, description: `Ruta ${req.originalUrl} método => [${req.method}]  no implementado` });
}
export default invalidPathHandler;
