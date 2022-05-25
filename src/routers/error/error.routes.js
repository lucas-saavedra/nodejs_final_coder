import express from "express";
const router = express.Router();
router.get('/register-error', async (req, res) => {
    res.render('register-error');
})
router.get('/login-error', async (req, res) => {
    res.render('login-error');
})
router.get('*', (req, res) => {
    res.render('route-error');
})
export default router;
