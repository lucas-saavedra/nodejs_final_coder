
import apiRoutes from './api/api.routes.js';
import express from 'express';

const router = express.Router();

router.use(apiRoutes);


export default router;